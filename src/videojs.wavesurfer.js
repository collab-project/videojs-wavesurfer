/**
 * @file videojs.wavesurfer.js
 *
 * The main file for the videojs-wavesurfer project.
 * License: https://github.com/collab-project/videojs-wavesurfer/blob/master/LICENSE
 */

import videojs from 'video.js';
import WaveSurfer from 'wavesurfer.js';

const Plugin = videojs.getPlugin('plugin');
const Component = videojs.getComponent('Component');

const ERROR = 'error';
const WARN = 'warn';


/**
 * Draw a waveform for audio and video files in a video.js player.
 *
 * @class HlsHandler
 * @extends videojs.Plugin
 * @param {Object} source the source object
 * @param {Object} options optional and required options
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

        if (options.options.src === 'live')
        {
            // check if the wavesurfer.js microphone plugin can be enabled
            try
            {
                this.microphone = Object.create(WaveSurfer.Microphone);

                // listen for events
                this.microphone.on('deviceError', this.onWaveError.bind(this));

                // enable audio input from a microphone
                this.liveMode = true;
                this.waveReady = true;

                this.log('wavesurfer.js microphone plugin enabled.');
            }
            catch (TypeError)
            {
                this.onWaveError('Could not find wavesurfer.js ' +
                    'microphone plugin!');
            }
        }

        let mergedOptions = this.initialize(this.player.options_.plugins.wavesurfer);

        // waveform events
        this.surfer = WaveSurfer.create(mergedOptions);
        this.surfer.on('error', this.onWaveError.bind(this));
        this.surfer.on('finish', this.onWaveFinish.bind(this));

        this.surferReady = this.onWaveReady.bind(this);
        this.surferProgress = this.onWaveProgress.bind(this);
        this.surferSeek = this.onWaveSeek.bind(this);

        // only listen to these events when we're not in live mode
        if (!this.liveMode)
        {
            this.setupPlaybackEvents(true);
        }

        // player events
        this.on('play', this.onPlay.bind(this));
        this.on('pause', this.onPause.bind(this));
        this.on('volumechange', this.onVolumeChange.bind(this));
        this.on('fullscreenchange', this.onScreenChange.bind(this));

        // kick things off
        this.startPlayers();
    }

    dispose() {
        super.dispose();
        videojs.log('the advanced plugin is being disposed');
    }

    updateState() {
        //this.setState({playing: !this.paused()});
    }

    logState(changed) {
        videojs.log(`the player is now ${this.state.playing ? 'playing' : 'paused'}`);
    }
    
    setupUI() {
        console.log('setupUI', this.player);

        // customize controls
        this.player.bigPlayButton.hide();

        // the native controls don't work for this UI so disable
        // them no matter what
        if (this.player.usingNativeControls_ === true)
        {
            if (this.player.tech_.el_ !== undefined)
            {
                this.player.tech_.el_.controls = false;
            }
        }

        if (this.player.options_.controls)
        {
            // make sure controlBar is showing
            this.player.controlBar.show();
            this.player.controlBar.el_.style.display = 'flex';

            // progress control isn't used by this plugin
            this.player.controlBar.progressControl.hide();

            // make sure time display is visible
            var element;
            var uiElements = [this.player.controlBar.currentTimeDisplay,
                              this.player.controlBar.timeDivider,
                              this.player.controlBar.durationDisplay];
            for (element in uiElements)
            {
                // ignore when elements have been disabled by user
                if (uiElements.hasOwnProperty(element))
                {
                    uiElements[element].el().style.display = 'block';
                    uiElements[element].show();
                }
            }
            if (this.player.controlBar.remainingTimeDisplay !== undefined)
            {
                this.player.controlBar.remainingTimeDisplay.hide();
            }
            if (this.player.controlBar.timeDivider !== undefined)
            {
                this.player.controlBar.timeDivider.el().style.textAlign = 'center';
                this.player.controlBar.timeDivider.el().style.width = '2em';
            }

            // disable play button until waveform is ready
            // (except when in live mode)
            if (!this.liveMode)
            {
                this.player.controlBar.playToggle.hide();
            }
        }
    }

    /**
     * Initializes the waveform.
     *
     * @param {Object} opts - Plugin options.
     * @private
     */
    initialize(opts) {
        this.originalHeight = this.player.options_.height;
        //let controlBarHeight = this.player.controlBar.height();
        let controlBarHeight;
        if (this.player.options_.controls === true) { // && controlBarHeight === 0)
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
            opts.height = this.player.height_ - controlBarHeight;
        } else {
            opts.height = opts.waveformHeight;
        }

        // split channels
        if (opts.splitChannels && opts.splitChannels === true) {
            opts.height /= 2;
        }

        // customize waveform appearance
        //this.surfer.init(opts);
        
        return opts;
    }

    /**
     * Start the players.
     * @private
     */
    startPlayers() {
        var options = this.player.options_.plugins.wavesurfer;

        // init waveform
        //this.initialize(options);

        if (options.src !== undefined)
        {
            if (this.microphone === undefined)
            {
                // show loading spinner
                //this.player.loadingSpinner.show();

                // start loading file
                this.load(options.src);
            }
            else
            {
                // hide loading spinner
                //this.player().loadingSpinner.hide();

                // connect microphone input to our waveform
                options.wavesurfer = this.surfer;
                this.microphone.init(options);
            }
        }
        else
        {
            // no valid src found, hide loading spinner
            //this.player().loadingSpinner.hide();
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
        if (enable === false)
        {
            this.surfer.un('ready', this.surferReady);
            this.surfer.un('audioprocess', this.surferProgress);
            this.surfer.un('seek', this.surferSeek);
        }
        else if (enable === true)
        {
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
        if (this.liveMode) {
            // start/resume microphone visualization
            if (!this.microphone.active)
            {
                this.log('Start microphone');
                this.microphone.start();
            }
            else
            {
                this.log('Resume microphone');
                this.microphone.play();
            }
        }
        else
        {
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
        if (this.liveMode) {
            // pause microphone visualization
            this.log('Pause microphone');
            this.microphone.pause();
        } else {
            // pause playback
            this.log('Pause playback');
            if (!this.waveFinished)
            {
                this.surfer.pause();
            }
            else
            {
                this.waveFinished = false;
            }

            this.setCurrentTime();
        }
    }

    /**
     * Remove the player and waveform.
     */
    destroy() {
        this.log('Destroying plugin');

        if (this.liveMode && this.microphone)
        {
            // destroy microphone plugin
            this.log('Destroying microphone');
            this.microphone.destroy();
        }

        this.surfer.destroy();
        this.player().dispose();
    }

    /**
     * Set the current volume.
     *
     * @param {number} volume - The new volume level.
     */
    setVolume(volume) {
        if (volume !== undefined) {
            this.log('Changing volume to: ' + volume);
            this.surfer.setVolume(volume);
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
        if (currentTime === undefined)
        {
            currentTime = this.surfer.getCurrentTime();
        }

        if (duration === undefined)
        {
            duration = this.surfer.getDuration();
        }

        currentTime = isNaN(currentTime) ? 0 : currentTime;
        duration = isNaN(duration) ? 0 : duration;
        let time = Math.min(currentTime, duration);

        // update control
        this.player.controlBar.currentTimeDisplay.contentEl(
            ).innerHTML = this.formatTime(time, duration);
    }

    /**
     * Get the duration of the stream in seconds.
     *
     * Returns 0 if no stream is available (yet).
     */
    getDuration() {
        var duration = this.surfer.getDuration();

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
        this.player.controlBar.durationDisplay.contentEl(
            ).innerHTML = this.formatTime(duration, duration);
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
        this.trigger('waveReady');

        // update time display
        this.setCurrentTime();
        this.setDuration();

        // wait until player ui is ready
        this.setupUI();

        // enable and show play button
        this.player.controlBar.playToggle.show();

        // hide loading spinner
        this.player.loadingSpinner.hide();

        // auto-play when ready (if enabled)
        if (this.player.options_.autoplay)
        {
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

        // check if player isn't paused already
        if (!this.player.paused())
        {
            // check if loop is enabled
            if (this.player.options_.loop)
            {
                // reset waveform
                this.surfer.stop();
                this.play();
            }
            else
            {
                // finished
                this.waveFinished = true;

                // pause player
                this.player.pause();
            }
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
        this.log(error, ERROR);

        this.player().trigger('error', error);
    }
    
    /**
     * Fired whenever the media in the player begins or resumes playback.
     * @private
     */
    onPlay() {
        // don't start playing until waveform's ready
        if (this.waveReady)
        {
            this.play();
        }
    }

    /**
     * Fired whenever the media in the player has been paused.
     * @private
     */
    onPause() {
        this.pause();
    }

    /**
     * Fired when the volume in the player changes.
     * @private
     */
    onVolumeChange() {
        var volume = this.player().volume();
        if (this.player().muted())
        {
            // muted volume
            volume = 0;
        }

        this.setVolume(volume);
    }

    /**
     * Fired when the player switches in or out of fullscreen mode.
     * @private
     */
    onScreenChange() {
        var isFullscreen = this.player().isFullscreen();
        var newHeight;

        if (!isFullscreen)
        {
            // restore original height
            newHeight = this.originalHeight;
        }
        else
        {
            // fullscreen height
            newHeight = window.outerHeight;
        }

        if (this.waveReady)
        {
            if (this.liveMode && !this.microphone.active)
            {
                // we're in live mode but the microphone hasn't been
                // started yet
                return;
            }

            // destroy old drawing
            this.surfer.drawer.destroy();

            // set new height
            this.surfer.params.height = newHeight - this.player().controlBar.height();
            this.surfer.createDrawer();

            // redraw
            this.surfer.drawBuffer();

            // make sure playhead is restored at right position
            this.surfer.drawer.progress(this.surfer.backend.getPlayedPercents());
        }
    }
    
    /**
     * Log message (if the debug option is enabled).
     * @private
     */
    log(args, logType)
    {
        if (this.debug === true)
        {
            if (logType === ERROR)
            {
                videojs.log.error(args);
            }
            else if (logType === WARN)
            {
                videojs.log.warn(args);
            }
            else
            {
                videojs.log(args);
            }
        }
    }
    
    /**
     * Format seconds as a time string, H:MM:SS, M:SS or M:SS:MMM.
     *
     * Supplying a guide (in seconds) will force a number of leading zeros
     * to cover the length of the guide.
     *
     * @param {number} seconds - Number of seconds to be turned into a
     *     string.
     * @param {number} guide - Number (in seconds) to model the string
     *     after.
     * @return {string} Time formatted as H:MM:SS, M:SS or M:SS:MMM, e.g.
     *     0:00:12.
     * @private
     */
    formatTime(seconds, guide) {
        // Default to using seconds as guide
        seconds = seconds < 0 ? 0 : seconds;
        guide = guide || seconds;
        var s = Math.floor(seconds % 60),
            m = Math.floor(seconds / 60 % 60),
            h = Math.floor(seconds / 3600),
            gm = Math.floor(guide / 60 % 60),
            gh = Math.floor(guide / 3600),
            ms = Math.floor((seconds - s) * 1000);

        // handle invalid times
        if (isNaN(seconds) || seconds === Infinity)
        {
            // '-' is false for all relational operators (e.g. <, >=) so this
            // setting will add the minimum number of fields specified by the
            // guide
            h = m = s = ms = '-';
        }

        // Check if we need to show milliseconds
        if (guide > 0 && guide < this.msDisplayMax)
        {
            if (ms < 100)
            {
                if (ms < 10)
                {
                    ms = '00' + ms;
                }
                else
                {
                    ms = '0' + ms;
                }
            }
            ms = ':' + ms;
        }
        else
        {
            ms = '';
        }

        // Check if we need to show hours
        h = (h > 0 || gh > 0) ? h + ':' : '';

        // If hours are showing, we may need to add a leading zero.
        // Always show at least one digit of minutes.
        m = (((h || gm >= 10) && m < 10) ? '0' + m : m) + ':';

        // Check if leading zero is need for seconds
        s = ((s < 10) ? '0' + s : s);

        return h + m + s + ms;
    }

}


function createWaveform() {
    var props = {
        className: 'vjs-waveform',
        tabIndex: 0
    };
    return Component.prototype.createEl('div', props);
};


//plugin defaults
let defaults = {
    // Display console log messages.
    debug: false,
    // msDisplayMax indicates the number of seconds that is
    // considered the boundary value for displaying milliseconds
    // in the time controls. An audio clip with a total length of
    // 2 seconds and a msDisplayMax of 3 will use the format
    // M:SS:MMM. Clips longer than msDisplayMax will be displayed
    // as M:SS or HH:MM:SS.
    msDisplayMax: 3
};

/**
 * Initialize the plugin.
 *
 * @param {Object} [options] - Configuration for the plugin.
 * @private
 */
var wavesurferPlugin = function(options) {
    var settings = videojs.mergeOptions(defaults, options);
    var player = this;

    // create new waveform
    player.waveform = new Waveform(player,
    {
        'el': createWaveform(),
        'options': settings
    });

    // add waveform to dom
    //player.el_.appendChild(player.waveform.el_);
};

if (videojs.registerPlugin) {
    videojs.registerPlugin('wavesurfer', wavesurferPlugin);
} else {
    videojs.plugin('wavesurfer', wavesurferPlugin);
}

module.exports = {
    wavesurferPlugin
};
