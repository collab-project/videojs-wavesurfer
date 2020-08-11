# React

This page shows how to get started with [React](https://reactjs.org) and
videojs-wavesurfer using [create-react-app](https://github.com/facebook/create-react-app).

For more information, check the video.js [documentation](https://github.com/videojs/video.js/blob/master/docs/guides/react.md)
for React.

## Installation

Create an example React application called `videojs-wavesurfer-react`:

```console
npx create-react-app videojs-wavesurfer-react
```

Install videojs-wavesurfer:

```console
cd videojs-wavesurfer-react
npm install --save videojs-wavesurfer
```

## Application

Replace content of `src/index.js` with:

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const videoJsOptions = {
    controls: true,
    bigPlayButton: false,
    width: 600,
    height: 300,
    fluid: false,
    plugins: {
        wavesurfer: {
            backend: 'MediaElement',
            displayMilliseconds: true,
            debug: true,
            waveColor: '#163b5b',
            progressColor: 'black',
            cursorColor: 'black',
            hideScrollbar: true
        }
    }
};

ReactDOM.render(
  <React.StrictMode>
    <App { ...videoJsOptions }/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
```

Replace content of `src/App.js`:

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
            const version_info = 'Using video.js ' + videojs.VERSION +
                ' with videojs-wavesurfer ' + videojs.getPluginVersion('wavesurfer') +
                ', wavesurfer.js ' + WaveSurfer.VERSION + ' and React ' + React.version;
            videojs.log(version_info);

            // load file
            this.player.src({src: 'hal.wav', type: 'audio/wav'});
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

Add the following to `src/index.css`:

```css
/* change player background color */
#myAudio {
  background-color: #ACB2F2;
}
```

## Media

Download the [example audio file](https://github.com/collab-project/videojs-wavesurfer/raw/master/examples/media/hal.wav)
and place it in the `public` directory.

## Run

Start the development server:

```console
npm start
```

And open http://localhost:3000 in a browser.
