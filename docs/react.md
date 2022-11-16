# React

This guide shows you how to get started with [React](https://reactjs.org) and
videojs-wavesurfer using [create-react-app](https://github.com/facebook/create-react-app).

For more information, check the video.js [documentation](https://videojs.com/guides/react/)
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

Replace content of `src/App.js` with:

```javascript
import './App.css';
import React from 'react';

import VideoJSComponent from './VideoJSComponent';

function App() {
  const playerRef = React.useRef(null);
  const videoJsOptions = {
    controls: true,
    bigPlayButton: false,
    inactivityTimeout: 0,
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

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // handle player events
    player.on('waveReady', (event) => {
      console.log('waveform: ready!');
    });

    player.on('playbackFinish', (event) => {
      console.log('playback finished.');
    });

    // error handling
    player.on('error', (element, error) => {
      console.error(error);
    });
  };

  return (
    <div className="App">
      <VideoJSComponent options={videoJsOptions} onReady={handlePlayerReady} />
    </div>
  );
}

export default App;
```

Add the following to `src/App.css`:

```css
/* change player background color */
.App video-js {
  background-color: #ACB2F2;
}
```

Create `src/VideoJSComponent.js`:

```javascript
import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
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

export const VideoJSComponent = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const {options, onReady} = props;

  React.useEffect(() => {

    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.className = 'video-js vjs-default-skin';
      videoRef.current.appendChild(videoElement);

      const player = playerRef.current = videojs(videoElement, options, () => {
        // print version information at startup
        const version_info = 'Using video.js ' + videojs.VERSION +
          ' with videojs-wavesurfer ' + videojs.getPluginVersion('wavesurfer') +
          ', wavesurfer.js ' + WaveSurfer.VERSION + ' and React ' + React.version;
        videojs.log(version_info);

        onReady && onReady(player);

        // load track
        player.src({src: 'hal.wav', type: 'audio/wav'});
      });

    // You could update an existing player in the `else` block here
    // on prop change, for example:
    } else {
      //const player = playerRef.current;
      //player.src({src: 'hal.wav', type: 'audio/wav'});
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
}

export default VideoJSComponent;
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
