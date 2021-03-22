# Webpack

This document describes how to setup [Webpack](https://webpack.js.org/) with videojs-wavesurfer.

## Installation

Install Webpack:

```console
npm install webpack webpack-dev-server webpack-cli css-loader style-loader -D
```

Install videojs-wavesurfer:

```console
npm install --save videojs-wavesurfer
```

## Configuration

Create the Webpack config file called `webpack.config.js`:

```javascript
const path = require('path');
const basePath = path.resolve(__dirname);

module.exports = {
    mode: 'development',
    context: path.join(basePath, 'src'),
    entry: {
        app: './app.js'
    },
    output: {
        path: path.join(basePath, 'dist'),
        filename: '[name].bundle.js',
        publicPath: '/dist'
    },
    devServer: {
        contentBase: basePath,
        watchContentBase: true
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        }]
    }
};
```

## Application

Create `src/index.html` containing:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
      <meta charset="utf-8">
      <title>Webpack videojs-wavesurfer example</title>

      <script src="/dist/app.bundle.js" type="text/javascript"></script>

      <style>
      /* change player background color */
      #myAudio {
          background-color: #FFFFB5;
      }
      </style>
  </head>

  <body>
    <audio id="myAudio" class="video-js vjs-default-skin"></audio>
  </body>

</html>
```

And create `src/app.js`:

```javascript
import video_css from 'video.js/dist/video-js.min.css';
import videojs from 'video.js';
import WaveSurfer from 'wavesurfer.js';

/*
// the following imports are only required when using the
// videojs-wavesurfer 'live' mode with the microphone plugin
// make sure to import them before importing videojs-wavesurfer
import 'webrtc-adapter';
import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js';
WaveSurfer.microphone = MicrophonePlugin;
*/

// register videojs-wavesurfer plugin
import wavesurfer_css from 'videojs-wavesurfer/dist/css/videojs.wavesurfer.css';
import Wavesurfer from 'videojs-wavesurfer/dist/videojs.wavesurfer.js';

let player;
const elementId = 'myAudio';
let src = {src: '/hal.wav', type: 'audio/wav'};

const playerOptions = {
    controls: true,
    bigPlayButton: false,
    autoplay: false,
    fluid: false,
    loop: false,
    width: 600,
    height: 300,
    plugins: {
        // configure videojs-wavesurfer plugin
        wavesurfer: {
            backend: 'MediaElement',
            displayMilliseconds: true,
            debug: true,
            waveColor: '#4A4A22',
            progressColor: 'black',
            cursorColor: 'black',
            hideScrollbar: true
        }
    }
};

// wait till DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // create player
    player = videojs(elementId, playerOptions, function() {
        console.log('player ready! id:', elementId);

        // print version information at startup
        const msg = 'Using video.js ' + videojs.VERSION +
            ' with videojs-wavesurfer ' + videojs.getPluginVersion('wavesurfer') +
            ' and wavesurfer.js ' + WaveSurfer.VERSION;
        videojs.log(msg);

        // load file
        player.src(src);
    });

    player.on('waveReady', function(event) {
        console.log('waveform is ready!');
    });

    player.on('playbackFinish', function(event) {
        console.log('playback finished.');
    });

    // error handling
    player.on('error', function(element, error) {
        console.error('ERROR:', error);
    });
});
```

## Media

Download the [example audio file](https://github.com/collab-project/videojs-wavesurfer/raw/master/examples/media/hal.wav)
and place it in the root directory.

## Run

Start the Webpack development server:

```
./node_modules/.bin/webpack serve --config=webpack.config.js
```

And open http://localhost:8080/src/index.html in a browser.
