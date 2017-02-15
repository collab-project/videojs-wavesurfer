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
            var metadata = this.params.metadata;
            console.log('metadata', metadata);

            // set metadata
            navigator.mediaSession.metadata = new MediaMetadata(metadata);

            // set playback action handlers
            navigator.mediaSession.setActionHandler('play', wavesurfer.play);
            navigator.mediaSession.setActionHandler('pause', wavesurfer.playPause);
            navigator.mediaSession.setActionHandler('seekbackward', wavesurfer.skipBackward);
            navigator.mediaSession.setActionHandler('seekforward', wavesurfer.skipForward);
        }
    }

};

WaveSurfer.util.extend(WaveSurfer.MediaSession, WaveSurfer.Observer);
