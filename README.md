Video.js Wavesurfer
===================

A [video.js](http://www.videojs.com/) plugin that adds a navigable waveform
for audio and video files, using the [wavesurfer.js](https://github.com/katspaugh/wavesurfer.js)
library. Includes support for fullscreen mode and [real-time visualization of microphone
input](#microphone-plugin).

![Screenshot](examples/img/screenshot.png?raw=true "Screenshot")

[![npm version](https://img.shields.io/npm/v/videojs-wavesurfer.svg?style=flat)](https://www.npmjs.com/package/videojs-wavesurfer)
[![npm](https://img.shields.io/npm/dm/videojs-wavesurfer.svg)](https://github.com/collab-project/videojs-wavesurfer/releases)
[![License](https://img.shields.io/npm/l/videojs-wavesurfer.svg)](LICENSE)
[![Build Status](https://travis-ci.org/collab-project/videojs-wavesurfer.svg?branch=master)](https://travis-ci.org/collab-project/videojs-wavesurfer)

Installation
------------

You can use [bower](http://bower.io) (`bower install videojs-wavesurfer`) or
[npm](https://www.npmjs.org) (`npm install videojs-wavesurfer`) to install the
plugin, or
[download it here](https://github.com/collab-project/videojs-wavesurfer/releases).

Since v2.0 this plugin is compatible with video.js 6.0 and wavesurfer.js 2.0 and
newer. If you want to use this plugin with an older video.js or wavesurfer.js version,
check the [archived releases](https://github.com/collab-project/videojs-wavesurfer/releases?after=1.3.7)
for a 1.3.x or older release of this plugin.

Take a look at the [changelog](./CHANGES.md) when upgrading from a previous
version of videojs-wavesurfer.

Using the Plugin
----------------

The plugin depends on the video.js and wavesurfer.js libraries:

```html
<link href="video-js.min.css" rel="stylesheet">
<link href="videojs.wavesurfer.css" rel="stylesheet">
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
[options](https://wavesurfer-js.org/docs/options.html):

```javascript
var player = videojs('myClip',
{
    controls: true,
    autoplay: true,
    loop: false,
    fluid: false,
    width: 600,
    height: 300,
    plugins: {
        wavesurfer: {
            src: 'media/hal.wav',
            peaks: 'media/hal.json',
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
| `peaks` | string | `null` | The URL of the JSON file with peak data corresponding to the source audio/video file. This allows the waveform to be created from pre-rendered peak data. This file can be generated using the [bbc/audiowaveform](https://github.com/bbc/audiowaveform) utility. Note that no peak data file is provided in the examples/media directory as the audio file hal.wav is not long enough to justify the use of pre-rendered peak data. |
| `debug` | boolean | `false` | Display internal log messages using the `videojs.log` method. |
| `msDisplayMax` | float | `3` | Indicates the number of seconds that is considered the boundary value for displaying milliseconds in the time controls. An audio clip with a total length of 2 seconds and a `msDisplayMax` of 3 will use the format `M:SS:MMM`. Clips with a duration that is longer than `msDisplayMax` will be displayed as `M:SS` or `HH:MM:SS`.|

Examples
--------

See the full `audio` example ([demo](https://collab-project.github.io/videojs-wavesurfer/examples/index.html) or [source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/index.html)) and
the `video` example ([demo](https://collab-project.github.io/videojs-wavesurfer/examples/video.html) or [source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/video.html)).

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
npm run start
```

And open http://localhost:9999/examples/index.html in a browser.

Methods
-------

Methods for this plugin documented below are available on the `wavesurfer` method
of the video.js player instance. For example:

```javascript
player.wavesurfer().destroy();
```

| Method | Description |
| --- | --- |
| `destroy` | Destroys the wavesurfer instance and children (including the video.js player). |
| `load(url)` | Load the clip at `url`. Also supports loading [File](https://developer.mozilla.org/nl/docs/Web/API/File) or [Blob](https://developer.mozilla.org/nl/docs/Web/API/Blob) objects. |
| `setVolume(level)` | Set the volume level (value between 0.0 and 1.0). |
| `play` | Start playback. |
| `pause` | Pause playback. |
| `getDuration` | Get the length of the stream in seconds. Returns 0 if no stream is available (yet). |
| `getCurrentTime` | Get the current time (in seconds) of the stream during playback. Returns 0 if no stream is available (yet). |
| `exportImage(format, quality)` | Save waveform image as data URI. Default format is `'image/png'`. |

Other wavesurfer.js methods
---------------------------

You can access the wavesurfer instance, for example to call the
wavesurfer.js `seekTo` method, by using the `surfer` property of the
`wavesurfer` plugin instance:

```javascript
player.wavesurfer().surfer.seekTo(1);
```

Events
------

Plugin events that are available on the video.js player instance. For example:

```javascript
player.on('waveReady', function(event) {
    console.log('waveform is ready!');
});
```

| Event | Description |
| --- | --- |
| `waveReady` | Audio is loaded, decoded and the waveform is drawn. |
| `playbackFinish` | Audio playback finished. |
| `error` | Error occurred. |

Customizing controls
--------------------

To disable and hide specific controls, use the video.js `controlBar` option:

```javascript
controlBar: {
    // hide fullscreen control
    fullscreenToggle: false
},
```

Responsive layout
-----------------

The `fluid` option for video.js will resize the player according to the size
of the window.

Configure the player; enable the video.js `'fluid'` option:

```javascript
fluid: true
```

See the full `fluid` example
([demo](https://collab-project.github.io/videojs-wavesurfer/examples/fluid.html) or
[source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/fluid.html)).


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
var player = videojs('myLiveAudio', {
    controls: true,
    width: 600,
    height: 300,
    plugins: {
        wavesurfer: {
            src: 'live',
            debug: true,
            waveColor: 'black',
            cursorWidth: 0,
            interact: false,
            hideScrollbar: true
        }
    }
});
```

The microphone plugin has additional configuration
[options](https://wavesurfer-js.org/plugins/microphone.html).

See the full `live` example
([demo](https://collab-project.github.io/videojs-wavesurfer/examples/live.html) or
[source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/live.html)).


Using with React
----------------

The `react` example shows how to integrate this plugin in a [React](https://reactjs.org) component
([demo](https://collab-project.github.io/videojs-wavesurfer/examples/react/index.html) or
[source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/react/index.html)).


More features using other plugins
---------------------------------

The Video.js community created
[lots of plugins](https://github.com/videojs/video.js/wiki/Plugins)
that can be used to enhance the player's functionality. Plugins actually
tested with `videojs-wavesurfer`:

- [videojs-record](https://github.com/collab-project/videojs-record) - Adds
  support for recording audio/video/image files.


Development
-----------

Install dependencies using npm:

```
npm install
```

Build a minified version:

```
npm run build
```

Generated files are placed in the `dist` directory.

During development:

```
npm run start
```

This will watch the source directory and rebuild when any changes
are detected. It will also serve the files on http://127.0.0.1:9999.

All commands for development are listed in the `package.json` file and
are run using:

```
npm run <command>
```


License
-------

This work is licensed under the [MIT License](LICENSE).


Donate
------

Please consider donating if you like this project. Bitcoin is accepted
and can be sent to `3PmXCqUggtq7KUWPbpN8WhMnb1Mfb1jbq8`.
