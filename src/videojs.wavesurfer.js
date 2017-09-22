/**
 * @file videojs.wavesurfer.js
 *
 * The main file for the videojs-wavesurfer project.
 * MIT license: https://github.com/collab-project/videojs-wavesurfer/blob/master/LICENSE
 */

import log from './log';
import formatTime from './format-time';
import pluginDefaultOptions from './defaults';

import videojs from 'video.js';
import WaveSurfer from 'wavesurfer.js';

const Plugin = videojs.getPlugin('plugin');
const Component = videojs.getComponent('Component');

/**
 * Draw a waveform for audio and video files in a video.js player.
 *
 * @class Waveform
 * @extends videojs.Plugin
 */
class Waveform extends Plugin {

    constructor(player, options) {
        super(player, options);

        // parse options
        this.waveReady = false;
        this.waveFinished = false;
        this.liveMode = false;
        this.debug = (options.options.debug.toString() === 'true');
        this.msDisplayMax = parseFloat(options.options.msDisplayMax);

        // microphone plugin
        if (options.options.src === 'live') {
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
        this.player.one('ready', this.initialize.bind(this));
    }

    /**
     * Player UI is ready.
     */
    initialize() {
        // customize controls
        this.player.bigPlayButton.hide();

        // the native controls don't work for this UI so disable
        // them no matter what
        if (this.player.usingNativeControls_ === true) {
            if (this.player.tech_.el_ !== undefined) {
                this.player.tech_.el_.controls = false;
            }
        }

        if (this.player.options_.controls) {
            // make sure controlBar is showing
            this.player.controlBar.show();
            this.player.controlBar.el_.style.display = 'flex';

            // progress control isn't used by this plugin
            this.player.controlBar.progressControl.hide();

            // make sure time displays are visible
            let element;
            let uiElements = [this.player.controlBar.currentTimeDisplay,
                              this.player.controlBar.timeDivider,
                              this.player.controlBar.durationDisplay];
            for (var d=0; d<uiElements.length; d++) {
                element = uiElements[d];
                // ignore and show when essential elements have been disabled
                // by user
                if (element !== undefined) {
                    element.el_.style.display = 'block';
                    element.show();
                }
            }
            if (this.player.controlBar.remainingTimeDisplay !== undefined) {
                this.player.controlBar.remainingTimeDisplay.hide();
            }

            // handle play toggle interaction
            this.player.controlBar.playToggle.on(['tap', 'click'],
                this.onPlayToggle.bind(this));

            // disable play button until waveform is ready
            // (except when in live mode)
            if (!this.liveMode) {
                this.player.controlBar.playToggle.hide();
            }
        }

        // wavesurfer.js setup
        let mergedOptions = this.parseOptions(this.player.options_.plugins.wavesurfer);
        this.surfer = WaveSurfer.create(mergedOptions);
        this.surfer.on('error', this.onWaveError.bind(this));
        this.surfer.on('finish', this.onWaveFinish.bind(this));
        if (this.liveMode === true) {
            // listen for wavesurfer.js microphone plugin events
            this.surfer.microphone.on('deviceError', this.onWaveError.bind(this));
        }
        this.surferReady = this.onWaveReady.bind(this);
        this.surferProgress = this.onWaveProgress.bind(this);
        this.surferSeek = this.onWaveSeek.bind(this);

        // only listen to these wavesurfer.js playback events when not
        // in live mode
        if (!this.liveMode) {
            this.setupPlaybackEvents(true);
        }

        // video.js events
        this.player.on('volumechange', this.onVolumeChange.bind(this));
        this.player.on('fullscreenchange', this.onScreenChange.bind(this));

        // resize
        this.surfer.drawer.wrapper.className = 'vjs-wavedisplay';
        var responsiveWave = WaveSurfer.util.debounce(
            this.onResizeChange.bind(this), 15);

        window.addEventListener('resize', responsiveWave);

        // kick things off
        this.startPlayers();
    }

    /**
     * Initializes the waveform options.
     *
     * @param {Object} opts - Plugin options.
     * @private
     */
    parseOptions(opts) {
        this.originalHeight = this.player.options_.height;

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
        if (opts.container === undefined) {
            opts.container = this.player.el_;
        }

        // set the height of generated waveform if user has provided height
        // from options. If height of waveform need to be customized then use
        // option below. For example: waveformHeight: 30
        if (opts.waveformHeight === undefined) {
            let waveWrapHeight = this.player.el_.getBoundingClientRect().height;
            opts.height = waveWrapHeight - controlBarHeight;
        } else {
            opts.height = opts.waveformHeight;
        }

        // split channels
        if (opts.splitChannels && opts.splitChannels === true) {
            opts.height /= 2;
        }

        // enable microphone plugin
        if (this.liveMode === true) {
            opts.plugins = [
                WaveSurfer.microphone.create(opts)
            ];

            this.log('wavesurfer.js microphone plugin enabled.');
        }

        return opts;
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
                this.load(options.src);
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
            this.surfer.un('ready', this.surferReady);
            this.surfer.un('audioprocess', this.surferProgress);
            this.surfer.un('seek', this.surferSeek);
        } else if (enable === true) {
            this.surfer.on('ready', this.surferReady);
            this.surfer.on('audioprocess', this.surferProgress);
            this.surfer.on('seek', this.surferSeek);
        }
    }

    /**
     * Start loading waveform data.
     *
     * @param {string|blob|file} url - Either the URL of the audio file,
     *     a Blob or a File object.
     */
    load(url) {
        if (url instanceof Blob || url instanceof File) {
            this.log('Loading object: ' + url);
            this.surfer.loadBlob(url);
        } else {
            this.log('Loading URL: ' + url);
            this.surfer.load(url);
        }
    }

    /**
     * Start/resume playback or microphone.
     */
    play() {
        // show pause button
        this.player.controlBar.playToggle.handlePlay();

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

            // start surfer playback
            this.surfer.play();
        }
    }

    /**
     * Pauses playback or microphone visualization.
     */
    pause() {
        // show play button
        this.player.controlBar.playToggle.handlePause();

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
        if (this.liveMode && this.surfer.microphone) {
            // destroy microphone plugin
            this.log('Destroying microphone plugin');
            this.surfer.microphone.destroy();
        }

        // destroy wavesurfer instance
        this.surfer.destroy();

        this.log('Destroyed plugin');
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
     * The default format is 'image/png'. Other supported types are
     * 'image/jpeg' and 'image/webp'.
     *
     * @param {string} [format=image/png] - String indicating the image format.
     * @param {number} [quality=1] - Number between 0 and 1 indicating image
     *     quality if the requested type is 'image/jpeg' or 'image/webp'.
     * @returns {string} The data URI of the image data.
     */
    exportImage(format, quality) {
        return this.surfer.exportImage(format, quality);
    }

    /**
     * Get the current time (in seconds) of the stream during playback.
     *
     * Returns 0 if no stream is available (yet).
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
        let time = Math.min(currentTime, duration);

        // update current time display component
        this.player.controlBar.currentTimeDisplay.formattedTime_ =
            this.player.controlBar.currentTimeDisplay.contentEl().lastChild.textContent =
                formatTime(time, duration, this.msDisplayMax);
    }

    /**
     * Get the duration of the stream in seconds.
     *
     * Returns 0 if no stream is available (yet).
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

        // update control
        //this.player.controlBar.durationDisplay.contentEl(
        //    ).innerHTML = formatTime(duration, duration, this.msDisplayMax);
        // update duration display component
        this.player.controlBar.durationDisplay.formattedTime_ =
            this.player.controlBar.durationDisplay.contentEl().lastChild.textContent =
                formatTime(duration, duration, this.msDisplayMax);
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
        this.player.trigger('waveReady');

        // update time display
        this.setCurrentTime();
        this.setDuration();

        // enable and show play button
        this.player.controlBar.playToggle.show();

        // hide loading spinner
        this.player.loadingSpinner.hide();

        // auto-play when ready (if enabled)
        if (this.player.options_.autoplay) {
            this.play();
        }
    }

    /**
     * Fires when audio playback completed.
     * @private
     */
    onWaveFinish() {
        this.log('Finished playback');

        this.player.trigger('playbackFinish');

        // check if loop is enabled
        if (this.player.options_.loop) {
            // reset waveform
            this.surfer.stop();
            this.play();
        } else {
            // finished
            this.waveFinished = true;

            // pause player
            this.pause();
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
        this.player.trigger('error', error);

        this.log(error, 'error');
    }

    /**
     * Fired when the play toggle is clicked.
     * @private
     */
    onPlayToggle() {
        if (this.surfer.isPlaying()) {
            this.pause();
        } else {
            this.play();
        }
    }

    /**
     * Fired when the volume in the player changes.
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
     * Fired when the player switches in or out of fullscreen mode.
     * @private
     */
    onScreenChange() {
        let isFullscreen = this.player.isFullscreen();
        let newHeight;

        if (!isFullscreen) {
            // restore original height
            newHeight = this.originalHeight;
        } else {
            // fullscreen height
            newHeight = window.outerHeight;
        }

        if (this.waveReady) {
            if (this.liveMode && !this.surfer.microphone.active) {
                // we're in live mode but the microphone hasn't been
                // started yet
                return;
            }

            // destroy old drawing
            this.surfer.drawer.destroy();

            // set new height
            this.surfer.params.height = newHeight - this.player.controlBar.height();
            this.surfer.createDrawer();

            // redraw
            this.surfer.drawBuffer();

            // make sure playhead is restored at right position
            this.surfer.drawer.progress(this.surfer.backend.getPlayedPercents());
        }
    }

    /**
     * Resize occured.
     *
     * @private
     */
    onResizeChange()
    {
        console.log('resize', this.player.height());

        /*if (!this.player().paused())
        {
            // put video.js player UI in pause mode
            this.pause();
            this.player().pause();
        }*/

        if (this.surfer !== undefined)
        {
            // redraw waveform
            this.redrawWaveform();
            // XXX: old
            //this.surfer.empty();
            //this.surfer.drawBuffer();
        }
    }

    /**
     * Redraw waveform.
     *
     * @param {string} error - The wavesurfer error.
     * @private
     */
    redrawWaveform(newHeight)
    {
        console.log('redrawWaveform', newHeight);
        console.log(this.player.height());

        let waveWrapHeight = this.player.el_.getBoundingClientRect().height;

        // destroy old drawing
        this.surfer.drawer.destroy();

        // set new height
        console.log("1:",this.surfer.params.height)
        console.log('cb height', this.player.controlBar.height())
        this.surfer.params.height = waveWrapHeight - this.player.controlBar.height();
        console.log("2: ",this.surfer.params.height)

        this.surfer.createDrawer();
        this.surfer.drawer.wrapper.className = 'vjs-wavedisplay';

        // redraw
        this.surfer.drawBuffer();

        // make sure playhead is restored at right position
        this.surfer.drawer.progress(this.surfer.backend.getPlayedPercents());
    }

    /**
     * @private
     */
    log(args, logType) {
        log(args, logType, this.debug);
    }
}

/**
 * Create HTML element for plugin.
 *
 * @private
 */
const createWaveform = function() {
    let props = {
        className: 'vjs-waveform',
        tabIndex: 0
    };
    return Component.prototype.createEl('div', props);
};

/**
 * Initialize the plugin.
 *
 * @param {Object} [options] - Configuration for the plugin.
 * @private
 */
const wavesurferPlugin = function(options) {
    let settings = videojs.mergeOptions(pluginDefaultOptions, options);
    let player = this;

    // create new waveform
    player.waveform = new Waveform(player, {
        'el': createWaveform(),
        'options': settings
    });
};

// register plugin
if (videojs.registerPlugin) {
    videojs.registerPlugin('wavesurfer', wavesurferPlugin);
} else {
    videojs.plugin('wavesurfer', wavesurferPlugin);
}

module.exports = {
    wavesurferPlugin
};
