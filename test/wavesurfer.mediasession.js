'use strict';

WaveSurfer.MediaSession = {
    init: function (params) {
        this.params = params;

        var wavesurfer = this.wavesurfer = params.wavesurfer;

        if (!this.wavesurfer) {
            throw new Error('No WaveSurfer instance provided');
        }

        if ('mediaSession' in navigator && typeof MediaMetadata === typeof Function)
        {
            this.metadata = this.params.metadata;
            console.log('metadata', this.metadata);

            // update metadata
            self.update();

            // set playback action handlers
            navigator.mediaSession.setActionHandler('play', wavesurfer.play);
            navigator.mediaSession.setActionHandler('pause', wavesurfer.playPause);
            navigator.mediaSession.setActionHandler('seekbackward', wavesurfer.skipBackward);
            navigator.mediaSession.setActionHandler('seekforward', wavesurfer.skipForward);

            var here = this;
	    wavesurfer.on('play', function () {
	        here.update();
	    });
        }
    },

    update: function()
    {
        // set metadata
        navigator.mediaSession.metadata = new MediaMetadata(this.metadata);
    }

};

WaveSurfer.util.extend(WaveSurfer.MediaSession, WaveSurfer.Observer);
