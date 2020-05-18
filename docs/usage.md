# Usage

The plugin depends on the video.js and wavesurfer.js libraries:

```javascript
// style
import 'video.js/dist/video-js.min.css';
import 'videojs-wavesurfer/dist/css/videojs.wavesurfer.css';

// libraries
import videojs from 'video.js';
import WaveSurfer from 'wavesurfer.js';
```

The videojs-wavesurfer plugin automatically registers itself after importing it:

```javascript
import Wavesurfer from 'videojs-wavesurfer/dist/videojs.wavesurfer.js';
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
            displayMilliseconds: true,
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
