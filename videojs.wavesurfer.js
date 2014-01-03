/**
 * Use waveform for audio files in video.js player.
 */
videojs.Waveform = videojs.Component.extend({

	init: function(player, options)
    {
        videojs.Component.call(this, player, options);

        // customize controls
        console.log(this.player().options());
        if (this.player().options().autoplay)
        {
        	this.player().bigPlayButton.hide();
        }
        if (this.player().options().controls)
    	{
        	this.player().controlBar.show();
            this.player().controlBar.progressControl.hide();
    	}

        // waveform events
        this.surfer = Object.create(WaveSurfer);
        this.surfer.on('ready', this.onWaveReady.bind(this));
        this.surfer.on('error', this.onWaveError.bind(this));
        this.surfer.on('progress', this.onWaveProgress.bind(this));
        this.surfer.on('seek', this.onWaveSeek.bind(this));

        // player events
        this.player().on('firstplay', this.onFirstPlay.bind(this));
        this.player().on('play', this.onPlay.bind(this));
        this.player().on('pause', this.onPause.bind(this));
        this.player().on('volumechange', this.onVolumeChange.bind(this));
        this.player().on('timeupdate', this.onTimeUpdate.bind(this));
    },

    /**
     * Initializes the waveform.
     */
    initialize: function(opts)
    {
        // set waveform element and dimensions
        opts.container = this.el();
        opts.height = this.player().height() - (
            this.player().controlBar.height()
        );

        // customize waveform appearance
        this.surfer.init(opts);
    },

    /**
     * Start loading waveform data.
     */
    load: function(url)
    {
        this.surfer.load(url);
    },

    /**
     * Start or resume playback.
     */
    play: function()
    {
        this.surfer.play();
    },
    
    /**
     * Pauses playback.
     */
    pause: function()
    {
        this.surfer.pause();
    },

    /**
     * Set the current volume of the media.
     */
    setVolume: function(volume)
    {
    	this.surfer.setVolume(volume);
    },

    /**
     * 
     */
    setCurrentTime: function()
    {
    	// set current time
    	var currentTime = this.formatTime(this.surfer.backend.getCurrentTime());
    	$(this.player().controlBar.currentTimeDisplay.el()).find(
    	    '.vjs-current-time-display').text(currentTime);
    },

    /**
     * Audio is loaded, decoded and the waveform is drawn.
     */
    onWaveReady: function()
    {
        // set total time
        var duration = this.formatTime(this.surfer.backend.getDuration());
        $(this.player().controlBar.durationDisplay.el()).find(
        	'.vjs-duration-display').text(duration);

        // remove loading spinner
        $(this.player().loadingSpinner.el()).remove();

        // auto-play when ready
        this.play();
    },

    /**
     * Fires continuously during audio playback.
     * 
     * @param percent: Percentage played so far.
     */
    onWaveProgress: function(percent)
    {
    	this.setCurrentTime();
    	
    	// completed playback
        if (percent >= 1)
        {
        	// pause player
        	this.player().pause();
        }
    },

    /**
     * Fires during seeking of the waveform.
     */
    onWaveSeek: function()
    {
    	this.setCurrentTime();
    },

    /**
     * Fired the first time a clip is played.
     */
    onFirstPlay: function()
    {
    	var options = this.options().options;

        // init waveform
        this.initialize(options);

        // start loading
        this.load(options.src);
    },

    /**
     * Fired whenever the media begins or resumes playback.
     */
    onPlay: function()
    {
        this.play();
    },

    /**
     * Fired whenever the media has been paused.
     */
    onPause: function()
    {
    	this.pause();
    },

    /**
     * Fired when the volume changes.
     */
    onVolumeChange: function()
    {
    	var volume = this.player().volume();
    	if (this.player().muted())
    	{
    		// muted
    		volume = 0;
    	}

    	this.setVolume(volume);
    },

    /**
     * Fired when the current playback position has changed
     *
     * During playback this is fired every 15-250 milliseconds,
     * depending on the playback technology in use.
     */
    onTimeUpdate: function()
    {
    	this.setCurrentTime();
    },

    /**
     * Waveform error.
     */
    onWaveError: function(error)
    {
        console.warn(error);
    },
    
    /**
    * Format seconds as a time string, H:MM:SS or M:SS
    * Supplying a guide (in seconds) will force a number of leading zeros
    * to cover the length of the guide
    * @param {Number} seconds Number of seconds to be turned into a string
    * @param {Number} guide Number (in seconds) to model the string after
    * @return {String} Time formatted as H:MM:SS or M:SS
    */
    formatTime: function(seconds, guide)
    {
      // Default to using seconds as guide
      guide = guide || seconds;
      var s = Math.floor(seconds % 60),
          m = Math.floor(seconds / 60 % 60),
          h = Math.floor(seconds / 3600),
          gm = Math.floor(guide / 60 % 60),
          gh = Math.floor(guide / 3600);

      // handle invalid times
      if (isNaN(seconds) || seconds === Infinity) {
        // '-' is false for all relational operators (e.g. <, >=) so this setting
        // will add the minimum number of fields specified by the guide
        h = m = s = '-';
      }

      // Check if we need to show hours
      h = (h > 0 || gh > 0) ? h + ':' : '';

      // If hours are showing, we may need to add a leading zero.
      // Always show at least one digit of minutes.
      m = (((h || gm >= 10) && m < 10) ? '0' + m : m) + ':';

      // Check if leading zero is need for seconds
      s = (s < 10) ? '0' + s : s;

      return h + m + s;
    }

});


var createWaveform = function()
{
    var props = {
        className: 'vjs-waveform',
        tabIndex: 0
    };
    return videojs.Component.prototype.createEl(null, props);
};

function wavesurferPlugin(options)
{
    // create new waveform
    this.waveform = new videojs.Waveform(this,
    {
        'el': createWaveform(),
        'options': options
    });
    
    // add waveform to dom
    this.el().appendChild(this.waveform.el());
};

videojs.plugin('wavesurfer', wavesurferPlugin);
