/**
 * @file videojs.wavesurfer.js
 *
 * The main file for the videojs-wavesurfer project.
 * MIT license: https://github.com/collab-project/videojs-wavesurfer/blob/master/LICENSE
 */

import Event from './event';
import log from './utils/log';
import formatTime from './utils/format-time';
import pluginDefaultOptions from './defaults';
import window from 'global/window';

import videojs from 'video.js';
import WaveSurfer from 'wavesurfer.js';

const Plugin = videojs.getPlugin('plugin');

const wavesurferClassName = 'vjs-wavedisplay';

/**
 * Draw a waveform for audio and video files in a video.js player.
 *
 * @class
 * @augments videojs.Plugin
 */
class Wavesurfer extends Plugin {
    /**
     * The constructor function for the class.
     *
     * @param {(videojs.Player|Object)} player - video.js Player object.
     * @param {Object} options - Player options.
     */
    constructor(player, options) {
        super(player, options);

        // add plugin style
        player.addClass('vjs-wavesurfer');

        // parse options
        options = videojs.mergeOptions(pluginDefaultOptions, options);
        this.waveReady = false;
        this.waveFinished = false;
        this.liveMode = false;
        this.debug = (options.debug.toString() === 'true');
        this.msDisplayMax = parseFloat(options.msDisplayMax);
        this.textTracksEnabled = (this.player.options_.tracks.length > 0);

        // microphone plugin
        if (options.src === 'live') {
            // check if the wavesurfer.js microphone plugin can be enabled
            if (WaveSurfer.microphone !== undefined) {
                // enable audio input from a microphone
                this.liveMode = true;
                this.waveReady = true;
            } else {
                this.onWaveError('Could not find wavesurfer.js ' +
                    'microphone plugin!');
                return;
            }
        }

        // wait until player ui is ready
        this.player.one(Event.READY, this.initialize.bind(this));
    }

    /**
     * Player UI is ready: customize controls.
     *
     * @private
     */
    initialize() {
        // hide big play button
        this.player.bigPlayButton.hide();

        // the native controls don't work for this UI so disable
        // them no matter what
        if (this.player.usingNativeControls_ === true) {
            if (this.player.tech_.el_ !== undefined) {
                this.player.tech_.el_.controls = false;
            }
        }

        // controls
        if (this.player.options_.controls === true) {
            // make sure controlBar is showing
            this.player.controlBar.show();
            this.player.controlBar.el_.style.display = 'flex';

            // progress control (if present) isn't used by this plugin
            if (this.player.controlBar.progressControl !== undefined) {
                this.player.controlBar.progressControl.hide();
            }

            // disable Picture-In-Picture toggle introduced in video.js 7.6.0
            // until there is support for canvas in the Picture-In-Picture
            // browser API (see https://www.chromestatus.com/features/4844605453369344)
            if (this.player.controlBar.pictureInPictureToggle !== undefined) {
                this.player.controlBar.pictureInPictureToggle.hide();
            }

            // make sure time displays are visible
            let uiElements = ['currentTimeDisplay', 'timeDivider', 'durationDisplay'];
            uiElements.forEach((element) => {
                // ignore and show when essential elements have been disabled
                // by user
                element = this.player.controlBar[element];
                if (element !== undefined) {
                    element.el_.style.display = 'block';
                    element.show();
                }
            });
            if (this.player.controlBar.remainingTimeDisplay !== undefined) {
                this.player.controlBar.remainingTimeDisplay.hide();
            }

            if (this.player.controlBar.playToggle !== undefined) {
                // handle play toggle interaction
                this.player.controlBar.playToggle.on(['tap', 'click'],
                    this.onPlayToggle.bind(this));

                // disable play button until waveform is ready
                // (except when in live mode)
                if (!this.liveMode) {
                    this.player.controlBar.playToggle.hide();
                }
            }
        }

        // wavesurfer.js setup
        let mergedOptions = this.parseOptions(this.player.options_.plugins.wavesurfer);
        this.surfer = WaveSurfer.create(mergedOptions);
        this.surfer.on(Event.ERROR, this.onWaveError.bind(this));
        this.surfer.on(Event.FINISH, this.onWaveFinish.bind(this));
        if (this.liveMode === true) {
            // listen for wavesurfer.js microphone plugin events
            this.surfer.microphone.on(Event.DEVICE_ERROR,
                this.onWaveError.bind(this));
        }
        this.surferReady = this.onWaveReady.bind(this);
        this.surferProgress = this.onWaveProgress.bind(this);
        this.surferSeek = this.onWaveSeek.bind(this);

        // only listen to these wavesurfer.js playback events when not
        // in live mode
        if (!this.liveMode) {
            this.setupPlaybackEvents(true);
        }

        // video.js player events
        this.player.on(Event.VOLUMECHANGE, this.onVolumeChange.bind(this));
        this.player.on(Event.FULLSCREENCHANGE, this.onScreenChange.bind(this));

        // make sure volume is muted when requested
        if (this.player.muted()) {
            this.setVolume(0);
        }

        // video.js fluid option
        if (this.player.options_.fluid === true) {
            // give wave element a classname so it can be styled
            this.surfer.drawer.wrapper.className = wavesurferClassName;
            // listen for window resize events
            this.responsiveWave = WaveSurfer.util.debounce(
                this.onResizeChange.bind(this), 150);
            window.addEventListener(Event.RESIZE, this.responsiveWave);
        }

        // text tracks
        if (this.textTracksEnabled) {
            if (this.player.controlBar.currentTimeDisplay !== undefined) {
                // disable timeupdates
                this.player.controlBar.currentTimeDisplay.off(
                    this.player, Event.TIMEUPDATE,
                    this.player.controlBar.currentTimeDisplay.throttledUpdateContent);
            }

            // sets up an interval function to track current time
            // and trigger timeupdate every 250 milliseconds.
            // needed for text tracks
            this.player.tech_.trackCurrentTime();
        }

        // kick things off
        this.startPlayers();
    }

    /**
     * Initializes the waveform options.
     *
     * @private
     * @param {Object} surferOpts - Plugin options.
     * @returns {Object} - Updated `surferOpts` object.
     */
    parseOptions(surferOpts) {
        let rect = this.player.el_.getBoundingClientRect();
        this.originalWidth = this.player.options_.width || rect.width;
        this.originalHeight = this.player.options_.height || rect.height;

        // controlbar
        let controlBarHeight = this.player.controlBar.height();
        if (this.player.options_.controls === true && controlBarHeight === 0) {
            // the dimensions of the controlbar are not known yet, but we
            // need it now, so we can calculate the height of the waveform.
            // The default height is 30px, so use that instead.
            controlBarHeight = 30;
        }

        // set waveform element and dimensions
        // Set the container to player's container if "container" option is
        // not provided. If a waveform needs to be appended to your custom
        // element, then use below option. For example:
        // container: document.querySelector("#vjs-waveform")
        if (surferOpts.container === undefined) {
            surferOpts.container = this.player.el_;
        }

        // set the height of generated waveform if user has provided height
        // from options. If height of waveform need to be customized then use
        // option below. For example: waveformHeight: 30
        if (surferOpts.waveformHeight === undefined) {
            let playerHeight = rect.height;
            surferOpts.height = playerHeight - controlBarHeight;
        } else {
            surferOpts.height = surferOpts.waveformHeight;
        }

        // split channels
        if (surferOpts.splitChannels && surferOpts.splitChannels === true) {
            surferOpts.height /= 2;
        }

        // enable wavesurfer.js microphone plugin
        if (this.liveMode === true) {
            surferOpts.plugins = [
                WaveSurfer.microphone.create(surferOpts)
            ];
            this.log('wavesurfer.js microphone plugin enabled.');
        }

        return surferOpts;
    }

    /**
     * Start the players.
     * @private
     */
    startPlayers() {
        let options = this.player.options_.plugins.wavesurfer;
        if (options.src !== undefined) {
            if (this.surfer.microphone === undefined) {
                // show loading spinner
                this.player.loadingSpinner.show();

                // start loading file
                this.load(options.src, options.peaks);
            } else {
                // hide loading spinner
                this.player.loadingSpinner.hide();

                // connect microphone input to our waveform
                options.wavesurfer = this.surfer;
            }
        } else {
            // no valid src found, hide loading spinner
            this.player.loadingSpinner.hide();
        }
    }

    /**
     * Starts or stops listening to events related to audio-playback.
     *
     * @param {boolean} enable - Start or stop listening to playback
     *     related events.
     * @private
     */
    setupPlaybackEvents(enable) {
        if (enable === false) {
            this.surfer.un(Event.READY, this.surferReady);
            this.surfer.un(Event.AUDIOPROCESS, this.surferProgress);
            this.surfer.un(Event.SEEK, this.surferSeek);
        } else if (enable === true) {
            this.surfer.on(Event.READY, this.surferReady);
            this.surfer.on(Event.AUDIOPROCESS, this.surferProgress);
            this.surfer.on(Event.SEEK, this.surferSeek);
        }
    }

    /**
     * Start loading waveform data.
     *
     * @param {string|blob|file} url - Either the URL of the audio file,
     *     a Blob or a File object.
     * @param {string|number[]} peaks - Either the URL of peaks
     *     data for the audio file, or an array with peaks data.
     */
    load(url, peaks) {
        if (url instanceof Blob || url instanceof File) {
            this.log('Loading object: ' + JSON.stringify(url));
            this.surfer.loadBlob(url);
        } else {
            // load peak data from file
            if (peaks !== undefined) {
                if (Array.isArray(peaks)) {
                    // use supplied peaks data
                    this.log('Loading URL: ' + url);
                    this.surfer.load(url, peaks);
                } else {
                    // load peak data from file
                    let requestOptions = {
                        url: peaks,
                        responseType: 'json'
                    };
                    // supply xhr options, if any
                    if (this.player.options_.plugins.wavesurfer.xhr !== undefined) {
                        requestOptions.xhr = this.player.options_.plugins.wavesurfer.xhr;
                    }
                    let request = WaveSurfer.util.fetchFile(requestOptions);

                    request.once('success', data => {
                        this.log('Loaded Peak Data URL: ' + peaks);
                        this.surfer.load(url, data);
                    });
                    request.on('error', e => {
                        this.log('Unable to retrieve peak data from ' + peaks +
                            '. Status code: ' + request.response.status, 'warn');
                        this.log('Loading URL: ' + url);
                        this.surfer.load(url);
                    });
                }
            } else {
                // no peaks
                this.log('Loading URL: ' + url);
                this.surfer.load(url);
            }
        }
    }

    /**
     * Start/resume playback or microphone.
     */
    play() {
        // show pause button
        if (this.player.controlBar.playToggle !== undefined &&
            this.player.controlBar.playToggle.contentEl()) {
            this.player.controlBar.playToggle.handlePlay();
        }

        if (this.liveMode) {
            // start/resume microphone visualization
            if (!this.surfer.microphone.active)
            {
                this.log('Start microphone');
                this.surfer.microphone.start();
            } else {
                // toggle paused
                let paused = !this.surfer.microphone.paused;

                if (paused) {
                    this.pause();
                } else {
                    this.log('Resume microphone');
                    this.surfer.microphone.play();
                }
            }
        } else {
            this.log('Start playback');

            // put video.js player UI in playback mode
            this.player.play();

            // start surfer playback
            this.surfer.play();
        }
    }

    /**
     * Pauses playback or microphone visualization.
     */
    pause() {
        // show play button
        if (this.player.controlBar.playToggle !== undefined &&
            this.player.controlBar.playToggle.contentEl()) {
            this.player.controlBar.playToggle.handlePause();
        }

        if (this.liveMode) {
            // pause microphone visualization
            this.log('Pause microphone');
            this.surfer.microphone.pause();
        } else {
            // pause playback
            this.log('Pause playback');

            if (!this.waveFinished) {
                // pause wavesurfer playback
                this.surfer.pause();
            } else {
                this.waveFinished = false;
            }

            this.setCurrentTime();
        }
    }

    /**
     * @private
     */
    dispose() {
        if (this.surfer) {
            if (this.liveMode && this.surfer.microphone) {
                // destroy microphone plugin
                this.surfer.microphone.destroy();
                this.log('Destroyed microphone plugin');
            }
            // destroy wavesurfer instance
            this.surfer.destroy();
        }
        if (this.textTracksEnabled) {
            this.player.tech_.stopTrackingCurrentTime();
        }
        this.log('Destroyed plugin');
    }

    /**
     * Indicates whether the plugin is destroyed or not.
     *
     * @return {boolean} Plugin destroyed or not.
     */
    isDestroyed() {
        return this.player && (this.player.children() === null);
    }

    /**
     * Remove the player and waveform.
     */
    destroy() {
        this.player.dispose();
    }

    /**
     * Set the volume level.
     *
     * @param {number} volume - The new volume level.
     */
    setVolume(volume) {
        if (volume !== undefined) {
            this.log('Changing volume to: ' + volume);

            // update player volume
            this.player.volume(volume);
        }
    }

    /**
     * Save waveform image as data URI.
     *
     * The default format is `'image/png'`. Other supported types are
     * `'image/jpeg'` and `'image/webp'`.
     *
     * @param {string} [format=image/png] - String indicating the image format.
     * @param {number} [quality=1] - Number between 0 and 1 indicating image
     *     quality if the requested type is `'image/jpeg'` or `'image/webp'`.
     * @returns {string} The data URI of the image data.
     */
    exportImage(format, quality) {
        return this.surfer.exportImage(format, quality);
    }

    /**
     * Change the audio output device.
     *
     * @param {string} deviceId - Id of audio output device.
     */
    setAudioOutput(deviceId) {
        if (deviceId) {
            this.surfer.setSinkId(deviceId).then((result) => {
                // notify listeners
                this.player.trigger(Event.AUDIO_OUTPUT_READY);
            }).catch((err) => {
                // notify listeners
                this.player.trigger(Event.ERROR, err);

                this.log(err, 'error');
            });
        }
    }

    /**
     * Get the current time (in seconds) of the stream during playback.
     *
     * Returns 0 if no stream is available (yet).
     *
     * @returns {float} Current time of the stream.
     */
    getCurrentTime() {
        let currentTime = this.surfer.getCurrentTime();
        currentTime = isNaN(currentTime) ? 0 : currentTime;

        return currentTime;
    }

    /**
     * Updates the player's element displaying the current time.
     *
     * @param {number} [currentTime] - Current position of the playhead
     *     (in seconds).
     * @param {number} [duration] - Duration of the waveform (in seconds).
     * @private
     */
    setCurrentTime(currentTime, duration) {
        if (currentTime === undefined) {
            currentTime = this.surfer.getCurrentTime();
        }

        if (duration === undefined) {
            duration = this.surfer.getDuration();
        }

        currentTime = isNaN(currentTime) ? 0 : currentTime;
        duration = isNaN(duration) ? 0 : duration;

        // update current time display component
        if (this.player.controlBar.currentTimeDisplay &&
            this.player.controlBar.currentTimeDisplay.contentEl()) {
            let time = Math.min(currentTime, duration);

            this.player.controlBar.currentTimeDisplay.formattedTime_ =
                this.player.controlBar.currentTimeDisplay.contentEl().lastChild.textContent =
                    formatTime(time, duration, this.msDisplayMax);
        }

        if (this.textTracksEnabled && this.player.tech_ && this.player.tech_.el_) {
            // only needed for text tracks
            this.player.tech_.setCurrentTime(currentTime);
        }
    }

    /**
     * Get the duration of the stream in seconds.
     *
     * Returns 0 if no stream is available (yet).
     *
     * @returns {float} Duration of the stream.
     */
    getDuration() {
        let duration = this.surfer.getDuration();
        duration = isNaN(duration) ? 0 : duration;

        return duration;
    }

    /**
     * Updates the player's element displaying the duration time.
     *
     * @param {number} [duration] - Duration of the waveform (in seconds).
     * @private
     */
    setDuration(duration) {
        if (duration === undefined) {
            duration = this.surfer.getDuration();
        }
        duration = isNaN(duration) ? 0 : duration;

        // update duration display component
        if (this.player.controlBar.durationDisplay &&
            this.player.controlBar.durationDisplay.contentEl()) {
            this.player.controlBar.durationDisplay.formattedTime_ =
                this.player.controlBar.durationDisplay.contentEl().lastChild.textContent =
                    formatTime(duration, duration, this.msDisplayMax);
        }
    }

    /**
     * Audio is loaded, decoded and the waveform is drawn.
     *
     * @fires waveReady
     * @private
     */
    onWaveReady() {
        this.waveReady = true;
        this.waveFinished = false;
        this.liveMode = false;

        this.log('Waveform is ready');
        this.player.trigger(Event.WAVE_READY);

        // update time display
        this.setCurrentTime();
        this.setDuration();

        // enable and show play button
        if (this.player.controlBar.playToggle !== undefined &&
            this.player.controlBar.playToggle.contentEl()) {
            this.player.controlBar.playToggle.show();
        }

        // hide loading spinner
        if (this.player.loadingSpinner.contentEl()) {
            this.player.loadingSpinner.hide();
        }

        // auto-play when ready (if enabled)
        if (this.player.options_.autoplay === true) {
            this.play();
        }
    }

    /**
     * Fires when audio playback completed.
     *
     * @fires playbackFinish
     * @private
     */
    onWaveFinish() {
        this.log('Finished playback');

        // notify listeners
        this.player.trigger(Event.PLAYBACK_FINISH);

        // check if loop is enabled
        if (this.player.options_.loop === true) {
            // reset waveform
            this.surfer.stop();
            this.play();
        } else {
            // finished
            this.waveFinished = true;

            // pause player
            this.pause();

            // show the replay state of play toggle
            this.player.trigger(Event.ENDED);

            // this gets called once after the clip has ended and the user
            // seeks so that we can change the replay button back to a play
            // button
            this.surfer.once(Event.SEEK, () => {
                if (this.player.controlBar.playToggle !== undefined) {
                    this.player.controlBar.playToggle.removeClass('vjs-ended');
                }
                this.player.trigger(Event.PAUSE);
            });
        }
    }

    /**
     * Fires continuously during audio playback.
     *
     * @param {number} time - Current time/location of the playhead.
     * @private
     */
    onWaveProgress(time) {
        this.setCurrentTime();
    }

    /**
     * Fires during seeking of the waveform.
     * @private
     */
    onWaveSeek() {
        this.setCurrentTime();
    }

    /**
     * Waveform error.
     *
     * @param {string} error - The wavesurfer error.
     * @private
     */
    onWaveError(error) {
        // notify listeners
        this.player.trigger(Event.ERROR, error);

        this.log(error, 'error');
    }

    /**
     * Fired when the play toggle is clicked.
     * @private
     */
    onPlayToggle() {
        // workaround for video.js 6.3.1 and newer
        if (this.player.controlBar.playToggle !== undefined &&
            this.player.controlBar.playToggle.hasClass('vjs-ended')) {
            this.player.controlBar.playToggle.removeClass('vjs-ended');
        }
        if (this.surfer.isPlaying()) {
            this.pause();
        } else {
            this.play();
        }
    }

    /**
     * Fired when the volume in the video.js player changes.
     * @private
     */
    onVolumeChange() {
        let volume = this.player.volume();
        if (this.player.muted()) {
            // muted volume
            volume = 0;
        }

        // update wavesurfer.js volume
        this.surfer.setVolume(volume);
    }

    /**
     * Fired when the video.js player switches in or out of fullscreen mode.
     * @private
     */
    onScreenChange() {
        // execute with tiny delay so the player element completes
        // rendering and correct dimensions are reported
        let fullscreenDelay = this.player.setInterval(() => {
            let isFullscreen = this.player.isFullscreen();
            let newWidth, newHeight;
            if (!isFullscreen) {
                // restore original dimensions
                newWidth = this.originalWidth;
                newHeight = this.originalHeight;
            }

            if (this.waveReady) {
                if (this.liveMode && !this.surfer.microphone.active) {
                    // we're in live mode but the microphone hasn't been
                    // started yet
                    return;
                }
                // redraw
                this.redrawWaveform(newWidth, newHeight);
            }

            // stop fullscreenDelay interval
            this.player.clearInterval(fullscreenDelay);

        }, 100);
    }

    /**
     * Fired when the video.js player is resized.
     *
     * @private
     */
    onResizeChange() {
        if (this.surfer !== undefined) {
            // redraw waveform
            this.redrawWaveform();
        }
    }

    /**
     * Redraw waveform.
     *
     * @param {number} [newWidth] - New width for the waveform.
     * @param {number} [newHeight] - New height for the waveform.
     * @private
     */
    redrawWaveform(newWidth, newHeight) {
        if (!this.isDestroyed()) {
            if (this.player.el_) {
                let rect = this.player.el_.getBoundingClientRect();
                if (newWidth === undefined) {
                    // get player width
                    newWidth = rect.width;
                }
                if (newHeight === undefined) {
                    // get player height
                    newHeight = rect.height;
                }
            }

            // destroy old drawing
            this.surfer.drawer.destroy();

            // set new dimensions
            this.surfer.params.width = newWidth;
            this.surfer.params.height = newHeight - this.player.controlBar.height();

            // redraw waveform
            this.surfer.createDrawer();
            this.surfer.drawer.wrapper.className = wavesurferClassName;
            this.surfer.drawBuffer();

            // make sure playhead is restored at right position
            this.surfer.drawer.progress(this.surfer.backend.getPlayedPercents());
        }
    }

    /**
     * Log message to console (if the debug option is enabled).
     *
     * @private
     * @param {Array} args - The arguments to be passed to the matching console
     *     method.
     * @param {string} logType - The name of the console method to use.
     */
    log(args, logType) {
        log(args, logType, this.debug);
    }
}

// version nr is injected during build
Wavesurfer.VERSION = __VERSION__;

// register plugin once
videojs.Wavesurfer = Wavesurfer;
if (videojs.getPlugin('wavesurfer') === undefined) {
    videojs.registerPlugin('wavesurfer', Wavesurfer);
}

export {Wavesurfer};