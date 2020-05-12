# Vue

This page shows how to get started with [Vue.js](https://vuejs.org/) and videojs-wavesurfer.

For more information, check the video.js [documentation](https://github.com/videojs/video.js/blob/master/docs/guides/vue.md) for Vue.js.

## Installation

Install the [Vue.js CLI](https://cli.vuejs.org/guide/) globally:

```console
npm install -g @vue/cli
```

Create a new application, e.g. `videojs-wavesurfer-app`:

```console
vue create --default videojs-wavesurfer-app
```

Install videojs-wavesurfer:

```console
cd videojs-wavesurfer-app
npm install --save videojs-wavesurfer
```

## Webpack config

Create `vue.config.js` with the following content:

```javascript
const webpack = require('webpack');

module.exports = {
  configureWebpack: {
    resolve: {
        alias: {
            videojs: 'video.js',
            WaveSurfer: 'wavesurfer.js'
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            videojs: 'video.js/dist/video.cjs.js'
        })
    ]
  }
}
```

## Application

Create `src/components/VideoJSWavesurfer.vue`:

```html
<template>
    <audio id="myAudio" class="video-js vjs-default-skin"></audio>
</template>

<script>
    /* eslint-disable */
    import 'video.js/dist/video-js.css'
    import 'videojs-wavesurfer/dist/css/videojs.wavesurfer.css'

    import videojs from 'video.js'
    import WaveSurfer from 'wavesurfer.js'
    import Wavesurfer from 'videojs-wavesurfer/dist/videojs.wavesurfer.js'

    export default {
        data() {
            return {
                player: '',
                options: {
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
                            msDisplayMax: 10,
                            debug: true,
                            waveColor: '#6f7982',
                            progressColor: 'black',
                            cursorColor: 'black',
                            hideScrollbar: true
                        }
                    }
                }
            };
        },
        mounted() {
            /* eslint-disable no-console */
            this.player = videojs('#myAudio', this.options, () => {
                // print version information at startup
                var msg = 'Using video.js ' + videojs.VERSION +
                    ' with videojs-wavesurfer ' + videojs.getPluginVersion('wavesurfer') +
                    ' and wavesurfer.js ' + WaveSurfer.VERSION;
                videojs.log(msg);

                // load file
                this.player.src({src: '/hal.wav', type: 'audio/wav'});
            });

            this.player.on('waveReady', event => {
                console.log('waveform is ready!');
            });

            this.player.on('playbackFinish', event => {
                console.log('playback finished.');
            });

            // error handling
            this.player.on('error', (element, error) => {
                console.warn(error);
            });
        },
        beforeDestroy() { 
            if (this.player) {
                this.player.dispose();
            }
        }
    }
</script>
```

Change `src/App.vue` to:

```html
<template>
  <div id="app">
    <VideoJSWavesurfer />
  </div>
</template>

<script>
import VideoJSWavesurfer from './components/VideoJSWavesurfer.vue'

export default {
  name: 'app',
  components: {
    VideoJSWavesurfer
  }
}
</script>

<style>
/* change player background color */
#myAudio {
  background-color: #95DDF5;
}
</style>
```

## Media

Download the [example audio file](https://github.com/collab-project/videojs-wavesurfer/raw/master/examples/media/hal.wav)
and place it in the `public` directory.

## Run example

Start the Vue.js development server:

```console
npm run serve
```

And open http://localhost:8080 in a browser.
