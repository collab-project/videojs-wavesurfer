Video.js Wavesurfer
===================

A [video.js](http://www.videojs.com/) plugin that adds a navigable waveform
for audio files, using the [wavesurfer.js](https://github.com/katspaugh/wavesurfer.js)
library. Includes support for fullscreen mode and realtime visualization of microphone
input.

![Screenshot](/examples/img/screenshot.png?raw=true "Screenshot")

Installation
------------

You can use [bower](http://bower.io) (`bower install videojs-wavesurfer`) or
[npm](https://www.npmjs.org) (`npm install videojs-wavesurfer`) to install the
plugin, or download and include `videojs.wavesurfer.js` in your project.

Using the Plugin
----------------

The plugin depends on the wavesurfer.js and video.js packages:

```html
<link href="http://vjs.zencdn.net/4.11.1/video-js.css" rel="stylesheet">

<script src="http://wavesurfer.fm/build/wavesurfer.min.js"></script>
<script src="http://vjs.zencdn.net/4.11.1/video.js"></script>
```

The plugin automatically registers itself when you include `videojs.wavesurfer.js`
in your page:

```html
<script src="videojs.wavesurfer.js"></script>
```

Include an `audio` tag:

```html
<audio id="myAudio" class="video-js vjs-default-skin"></audio>
```

Options
-------

Configure the player using the video.js
[options](https://github.com/videojs/video.js/blob/master/docs/guides/options.md),
and enable the plugin by adding a `wavesurfer` entry with the related wavesurfer.js
[options](https://github.com/katspaugh/wavesurfer.js#wavesurfer-options):

```javascript
var player = videojs("myAudio",
{
    controls: true,
    autoplay: true,
    loop: false,
    width: 600,
    height: 300,
    plugins: {
        wavesurfer: {
            src: "media/heres_johnny.wav",
            msDisplayMax: 10,
            waveColor: "grey",
            progressColor: "black",
            cursorColor: "black",
            hideScrollbar: true
        }
    }
});
```

See the ![full example here](/examples/index.html "Example").

Plugin options
--------------

Additional options for this plugin.

| option | type | default | description |
| --- | --- | --- | --- |
| `src` | string | `null` | The URL of the audio file or `'live'` when using the microphone.|
| `msDisplayMax` | float | `3` | Indicates the number of seconds that is considered the boundary value for displaying milliseconds in the time controls. An audio clip with a total length of 2 seconds and a `msDisplayMax` of 3 will use the format `M:SS:MMM`. Clips with a duration that is longer than `msDisplayMax` will be displayed as `M:SS` or `HH:MM:SS`.|

Customizing controls
--------------------

If you want to disable and hide specific controls, use the video.js `children`
option:

```javascript
children: {
    controlBar: {
        children: {
            // hide fullscreen control
            fullscreenToggle: false
        }
    }
},
```

License
-------

This work is licensed under the [MIT License](LICENSE).
