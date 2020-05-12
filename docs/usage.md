# Usage

The plugin depends on the video.js and wavesurfer.js libraries:

```html
<!-- style -->
<link href="video-js.min.css" rel="stylesheet">
<link href="videojs.wavesurfer.css" rel="stylesheet">

<!-- libraries -->
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
<video id="myClip" class="video-js vjs-default-skin" playsinline></video>
```

Define the player configuration and enable the videojs-wavesurfer plugin by
adding a `wavesurfer` entry:

```javascript
// configuration for video.js
let options = {
    controls: true,
    bigPlayButton: false,
    autoplay: false,
    loop: false,
    fluid: false,
    width: 600,
    height: 300,
    plugins: {
        // enable videojs-wavesurfer plugin
        wavesurfer: {
            // configure videojs-wavesurfer
            backend: 'MediaElement',
            msDisplayMax: 10,
            debug: true,
            waveColor: 'grey',
            progressColor: 'black',
            cursorColor: 'black',
            hideScrollbar: true
        }
    }
};
```

Finally, create the player and load a file:

```javascript
let player = videojs('myClip', options, function() {
    // print version information at startup
    let msg = 'Using video.js ' + videojs.VERSION +
        ' with videojs-wavesurfer ' +
        videojs.getPluginVersion('wavesurfer') +
        ' and wavesurfer.js ' + WaveSurfer.VERSION;
    videojs.log(msg);

    // load wav file from url
    player.src({src: 'media/hal.wav', type: 'audio/wav'});
});
```

Check the [options](options.md), [methods](methods.md) and [events](events.md) documentation
for more information.
