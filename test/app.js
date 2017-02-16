'use strict';

// Create an instance
var wavesurfer = Object.create(WaveSurfer);

// Init & load
document.addEventListener('DOMContentLoaded', function () {
    var options = {
        container     : '#waveform',
        waveColor     : 'black',
        backend       : 'MediaElement'
    };

    // Init wavesurfer
    wavesurfer.init(options);

    // Init MediaSession plugin
    var msPlugin = Object.create(WaveSurfer.MediaSession);
    msPlugin.init({
        wavesurfer: wavesurfer,
        metadata: {
            title: 'Wavesurfer.js Example',
            artist: 'The Wavesurfer.js Project',
            album: 'Media Session Plugin',
            artwork: [
                {src: 'img/hal-9000-96x96.png',   sizes: '96x96',   type: 'image/png'},
                {src: 'img/hal-9000-128x128.png', sizes: '128x128', type: 'image/png'},
                {src: 'img/hal-9000-192x192.png', sizes: '192x192', type: 'image/png'},
                {src: 'img/hal-9000-256x256.png', sizes: '256x256', type: 'image/png'},
                {src: 'img/hal-9000-384x384.png', sizes: '384x384', type: 'image/png'},
                {src: 'img/hal-9000-512x512.png', sizes: '512x512', type: 'image/png'}
            ]
        }
    });

    // controls
    document.querySelector(
        '[data-action="play"]'
    ).addEventListener('click', wavesurfer.playPause.bind(wavesurfer));

    // load audio from existing media element
    var mediaElt = document.querySelector('audio');
    wavesurfer.load(mediaElt);
});
