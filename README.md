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
plugin, or download and include `videojs.wavesurfer.js` in your project.

Using the Plugin
----------------

The plugin depends on the wavesurfer.js and video.js packages:

```html
<link href="http://cdnjs.cloudflare.com/ajax/libs/video.js/4.12.3/video-js.css" rel="stylesheet">

<script src="http://wavesurfer.fm/dist/wavesurfer.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/video.js/4.12.3/video.js"></script>
```

The plugin automatically registers itself when you include `videojs.wavesurfer.js`
on your page:

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
[options](https://github.com/katspaugh/wavesurfer.js#wavesurfer-options):

```javascript
var player = videojs("myClip",
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

See the full [audio example](/examples/index.html "Basic audio example") or
the [video example](/examples/video.html "Basic video example").


The additional options for this plugin are:

| option | type | default | description |
| --- | --- | --- | --- |
| `src` | string | `null` | The URL of the audio/video file or `'live'` when [using the microphone plugin](#microphone-plugin).|
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

Microphone plugin
-----------------

It's also possible to use a microphone for real-time rendering of the audio waveform. This
uses the [microphone plugin](https://github.com/katspaugh/wavesurfer.js/blob/master/plugin/wavesurfer.microphone.js)
that comes with wavesurfer.js.

Include the additional `wavesurfer.microphone.js` plugin on your page:

```html
<script src="http://wavesurfer.fm/dist/plugin/wavesurfer.microphone.min.js"></script>
```

Add an `audio` element:

```html
<audio id="myLiveAudio" class="video-js vjs-default-skin"></audio>
```

Configure the player: use the value `'live'` for the `src` option and [hide some player
controls](#customizing-controls) that we don't use:

```javascript
var player = videojs("myLiveAudio",
{
    controls: true,
    width: 600,
    height: 300,
    children: {
        controlBar: {
            children: {
                currentTimeDisplay: false,
                durationDisplay: false,
                muteToggle: false,
                timeDivider: false,
                volumeControl: false
            }
        }
    },
    plugins: {
        wavesurfer: {
            src: "live",
            waveColor: "black",
            cursorWidth: 0,
            interact: false
        }
    }
});
```

See the full [live example here](/examples/live.html "Microphone Example").


More features using other plugins
---------------------------------

The Video.js community created
[lots of plugins](https://github.com/videojs/video.js/wiki/Plugins)
that can be used to enhance the player's functionality. Plugins actually
tested with `videojs-wavesurfer`:

- [videojs-record](https://github.com/collab-project/videojs-record) - Adds
  support for recording audio/video files.
- [videojs-persistvolume](https://github.com/theonion/videojs-persistvolume) -
  Saves user's volume setting using `localStorage`, but falls back to cookies
  if necessary.


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

Or using bower:

```
bower install
```

Build a minified version:

```
grunt
```

Generated files are placed in the `dist` directory.

License
-------

This work is licensed under the [MIT License](LICENSE).
