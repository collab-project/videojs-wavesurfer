Video.js Wavesurfer
===================

A [video.js](http://www.videojs.com/) plugin that adds a navigable waveform
for audio and video files, using the [wavesurfer.js](https://github.com/katspaugh/wavesurfer.js)
library. Includes support for fullscreen mode and [real-time visualization of microphone
input](#microphone-plugin).

![Screenshot](examples/img/screenshot.png?raw=true "Screenshot")

[![npm version](https://img.shields.io/npm/v/videojs-wavesurfer.svg?style=flat)](https://www.npmjs.com/package/videojs-wavesurfer)
[![npm](https://img.shields.io/npm/dm/videojs-wavesurfer.svg)]()
[![License](https://img.shields.io/npm/l/videojs-wavesurfer.svg)](LICENSE)
[![Build Status](https://travis-ci.org/collab-project/videojs-wavesurfer.svg?branch=master)](https://travis-ci.org/collab-project/videojs-wavesurfer)

Installation
------------

You can use [bower](http://bower.io) (`bower install videojs-wavesurfer`) or
[npm](https://www.npmjs.org) (`npm install videojs-wavesurfer`) to install the
plugin, or
[download it here](https://github.com/collab-project/videojs-wavesurfer/releases).

Since v1.0 this plugin is compatible with video.js 5.0 and newer. If you want to use
this plugin with an older video.js 4.x version, check the
[archived releases](https://github.com/collab-project/videojs-wavesurfer/releases?after=1.0.0)
for a 0.9.x or older release of this plugin.

Take a look at the [changelog](./CHANGES.md) when upgrading from a previous
version of videojs-wavesurfer.

Using the Plugin
----------------

The plugin depends on the video.js and wavesurfer.js libraries:

```html
<link href="video-js.min.css" rel="stylesheet">
<script src="video.min.js"></script>

<script src="wavesurfer.min.js"></script>
```

The plugin automatically registers itself when the `videojs.wavesurfer.js`
script is loaded:

```html
<script src="videojs.wavesurfer.js"></script>
```

Add an `audio` element:

```html
<audio id="myClip" class="video-js vjs-default-skin"></audio>
```

Or `video` element:

```html
<video id="myClip" class="video-js vjs-default-skin"></video>
```

Plugin Options
--------------

Configure the player using the video.js
[options](https://github.com/videojs/video.js/blob/master/docs/guides/options.md),
and enable the plugin by adding a `wavesurfer` entry with the related wavesurfer.js
[options](http://wavesurfer-js.org/docs/options.html):

```javascript
var player = videojs('myClip',
{
    controls: true,
    autoplay: true,
    loop: false,
    width: 600,
    height: 300,
    plugins: {
        wavesurfer: {
            src: 'media/hal.wav',
            msDisplayMax: 10,
            debug: true,
            waveColor: 'grey',
            progressColor: 'black',
            cursorColor: 'black',
            hideScrollbar: true
        }
    }
});
```

The additional options for this plugin are:

| option | type | default | description |
| --- | --- | --- | --- |
| `src` | string | `null` | The URL of the audio/video file or `'live'` when [using the microphone plugin](#microphone-plugin).|
| `debug` | boolean | `false` | Display internal log messages using the `videojs.log` method. |
| `msDisplayMax` | float | `3` | Indicates the number of seconds that is considered the boundary value for displaying milliseconds in the time controls. An audio clip with a total length of 2 seconds and a `msDisplayMax` of 3 will use the format `M:SS:MMM`. Clips with a duration that is longer than `msDisplayMax` will be displayed as `M:SS` or `HH:MM:SS`.|

Examples
--------

See the full audio example ([demo](https://collab-project.github.io/videojs-wavesurfer/examples/index.html) or [source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/index.html)) and
the video example ([demo](https://collab-project.github.io/videojs-wavesurfer/examples/video.html) or [source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/video.html)).

To try out the examples locally, checkout the repository using Git:
```
git clone https://github.com/collab-project/videojs-wavesurfer.git
```

And install the dependencies using npm:
```
cd videojs-wavesurfer
npm install
```

Start the local webserver for the examples:
```
grunt serve
```

And open http://localhost:9000/examples/index.html in a browser.

Methods
-------

Methods for this plugin documented below are available on the `waveform` object
of the video.js player instance. For example:

```javascript
player.waveform.destroy();
```

| Method | Description |
| --- | --- |
| `destroy` | Destroys the wavesurfer instance and children (including the video.js player). |
| `load(url)` | Load the clip at `url`. Also supports loading [File](https://developer.mozilla.org/nl/docs/Web/API/File) or [Blob](https://developer.mozilla.org/nl/docs/Web/API/Blob) objects. |
| `setVolume(level)` | Set the volume level. |
| `play` | Start playback. |
| `pause` | Pause playback. |
| `getDuration` | Get the length of the stream in seconds. Returns 0 if no stream is available (yet). |
| `getCurrentTime` | Get the current time (in seconds) of the stream during playback. Returns 0 if no stream is available (yet). |
| `exportImage(format, quality)` | Save waveform image as data URI. Default format is `'image/png'`. |

Other wavesurfer.js methods
---------------------------

You can access the wavesurfer instance, for example to call the
`zoom` method, by using the `waveform.surfer` property on the `player`
instance:

```javascript
player.waveform.surfer.zoom(2);
```

Events
------

Plugin events that are available on the video.js player instance. For example:

```javascript
player.on('waveReady', function()
{
    console.log('waveform is ready!');
});
```

| Event | Description |
| --- | --- |
| `waveReady` | Audio is loaded, decoded and the waveform is drawn. |
| `playbackFinish` | Audio playback finished. |

Customizing controls
--------------------

To disable and hide specific controls, use the video.js `controlBar` option:

```javascript
controlBar: {
    // hide fullscreen control
    fullscreenToggle: false
},
```

Microphone plugin
-----------------

It's also possible to use a microphone for real-time rendering of the audio waveform. This
uses the [microphone plugin](https://github.com/katspaugh/wavesurfer.js/blob/master/plugin/wavesurfer.microphone.js)
that comes with wavesurfer.js.

Include the additional `wavesurfer.microphone.js` plugin on your page.

```html
<script src="wavesurfer.microphone.min.js"></script>
```

Add an `audio` element:

```html
<audio id="myLiveAudio" class="video-js vjs-default-skin"></audio>
```

Configure the player: use the value `'live'` for the `src` option:

```javascript
var player = videojs('myLiveAudio',
{
    controls: true,
    width: 600,
    height: 300,
    plugins: {
        wavesurfer: {
            src: 'live',
            debug: true,
            waveColor: 'black',
            cursorWidth: 0,
            interact: false
        }
    }
});
```

The microphone plugin has additional configuration
[options](https://wavesurfer-js.org/plugins/microphone.html).

See the full live example
([demo](https://collab-project.github.io/videojs-wavesurfer/examples/live.html) or
[source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/live.html)).


More features using other plugins
---------------------------------

The Video.js community created
[lots of plugins](https://github.com/videojs/video.js/wiki/Plugins)
that can be used to enhance the player's functionality. Plugins actually
tested with `videojs-wavesurfer`:

- [videojs-record](https://github.com/collab-project/videojs-record) - Adds
  support for recording audio/video/image files.


Contributing
------------

Install `grunt-cli`:

```
sudo npm install -g grunt-cli
```

Install dependencies using npm:

```
npm install
```

Build a minified version:

```
grunt
```

Generated files are placed in the `dist` directory.

License
-------

This work is licensed under the [MIT License](LICENSE).
