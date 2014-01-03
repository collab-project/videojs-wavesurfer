Video.js Wavesurfer
===================

A [video.js](http://www.videojs.com/) plugin that adds a navigable waveform
for audio files, using the excellent [wavesurfer.js](https://github.com/katspaugh/wavesurfer.js)
library.

Using the Plugin
----------------

The plugin depends on wavesurfer.js and video.js:

    <link href="http://vjs.zencdn.net/4.3.0/video-js.css" rel="stylesheet">
    
    <script src="http://wavesurfer.fm/build/wavesurfer.min.js"></script>
    <script src="http://vjs.zencdn.net/4.3.0/video.js"></script>

The plugin automatically registers itself when you include `videojs.wavesurfer.js`
in your page:

    <script src='videojs.wavesurfer.js'></script>

