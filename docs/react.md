# React

This page shows how to get started with [React](https://reactjs.org) and
videojs-wavesurfer using [create-react-app](https://github.com/facebook/create-react-app).

For more information, check the video.js [documentation](https://github.com/videojs/video.js/blob/master/docs/guides/react.md)
for React.

## Installation

Create an example React application called `audio-app`:

```console
npx create-react-app audio-app
```

Install videojs-wavesurfer:

```console
cd audio-app
npm install --save videojs-wavesurfer
```

Install [react-app-wired](https://github.com/timarney/react-app-rewired) that we'll
use to configure Webpack:

```console
npm install react-app-rewired --save-dev
```

## Application

Edit `src/index.js`:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const videoJsOptions = {
    controls: true,
    width: 600,
    height: 300,
    fluid: false,
    plugins: {
        wavesurfer: {
            src: 'hal.wav',
            msDisplayMax: 10,
            debug: true,
            waveColor: '#163b5b',
            progressColor: 'black',
            cursorColor: 'black',
            hideScrollbar: true
        }
    }
};

ReactDOM.render(<App { ...videoJsOptions }/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
```

Edit `src/App.js`:

```javascript
/* eslint-disable */
import React, { Component } from 'react';

import './App.css';

import 'video.js/dist/video-js.css';
import videojs from 'video.js';

import WaveSurfer from 'wavesurfer.js';

/*
// the following imports are only needed when you're using 
// the microphone plugin
import 'webrtc-adapter';

import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone.js';
WaveSurfer.microphone = MicrophonePlugin;
*/

// register videojs-wavesurfer plugin with this import
import 'videojs-wavesurfer/dist/css/videojs.wavesurfer.css';
import Wavesurfer from 'videojs-wavesurfer/dist/videojs.wavesurfer.js';

class App extends Component {
    componentDidMount() {
        // instantiate Video.js
        this.player = videojs(this.audioNode, this.props, () => {
            // print version information at startup
            var version_info = 'Using video.js ' + videojs.VERSION +
                ' with videojs-wavesurfer ' + videojs.getPluginVersion('wavesurfer') +
                ' and wavesurfer.js ' + WaveSurfer.VERSION;
            videojs.log(version_info);
        });

        this.player.on('waveReady', (event) => {
            console.log('waveform: ready!');
        });

        this.player.on('playbackFinish', (event) => {
            console.log('playback finished.');
        });

        // error handling
        this.player.on('error', (element, error) => {
            console.error(error);
        });
    }

    // destroy player on unmount
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    }
    render() {
        return (
        <div data-vjs-player>
            <audio id="myAudio" ref={node => this.audioNode = node} className="video-js vjs-default-skin"></audio>
        </div>
        );
    }
}

export default App;
```

Add this to `src/index.css`:

```css
/* change player background color */
#myAudio {
  background-color: #ACB2F2;
}
```

## Webpack configuration

Create a `config-overrides.js` file in the root directory:

```javascript
const webpack = require("webpack");

module.exports = function override(config, env) {
  // Extend the config to work with the videojs-wavesurfer project without ejecting create react app.
  // Reference: https://github.com/collab-project/videojs-wavesurfer/wiki/React
  const videojsPlugin = new webpack.ProvidePlugin({
    videojs: "video.js/dist/video.cjs.js"
  });
  const videojsAlias = {
    videojs: "video.js",
    WaveSurfer: "wavesurfer.js"
  };
  config.resolve.alias = { ...config.resolve.alias, ...videojsAlias };
  config.plugins.push(videojsPlugin);
  return config;
};
```

Change the existing calls to `react-scripts` in the `scripts` section of `package.json`
for `start`, `build` and `test`:

```json
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test --env=jsdom",
    "eject": "react-scripts eject"
}
```

## Content

Download the [example audio file](https://github.com/collab-project/videojs-wavesurfer/raw/master/examples/media/hal.wav)
and place it in the `public` directory.

## Run

Start the development server:

```
npm start
```

And open http://localhost:3000 in a browser.
