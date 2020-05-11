# Microphone plugin

It's also possible to use a microphone for real-time rendering of the audio waveform. This
uses the [microphone plugin](https://wavesurfer-js.org/plugins/microphone.html) that comes
with wavesurfer.js.

## Usage

Include the additional `wavesurfer.microphone.js` plugin on your page.

```html
<script src="wavesurfer.microphone.min.js"></script>
```

Add an `audio` element:

```html
<audio id="myLiveAudio" class="video-js vjs-default-skin"></audio>
```

Hide irrelevant controls, specify the `WebAudio` backend and enable the microphone plugin:

```javascript
let player = videojs('myLiveAudio', {
    controls: true,
    width: 600,
    height: 300,
    controlBar: {
        currentTimeDisplay: false,
        timeDivider: false,
        durationDisplay: false,
        remainingTimeDisplay: false,
        volumePanel: false,
        progressControl: false
    },
    plugins: {
        wavesurfer: {
            debug: true,
            backend: 'WebAudio',
            waveColor: 'black',
            cursorWidth: 0,
            interact: false,
            hideScrollbar: true,
            plugins: [
                // enable microphone plugin
                WaveSurfer.microphone.create({
                    bufferSize: 4096,
                    numberOfInputChannels: 1,
                    numberOfOutputChannels: 1,
                    constraints: {
                        video: false,
                        audio: true
                    }
                })
            ]
        }
    }
});
```

The wavesurfer.js microphone plugin has additional configuration
[options](https://wavesurfer-js.org/plugins/microphone.html).

## Example

- [online demo](https://collab-project.github.io/videojs-wavesurfer/examples/live.html)
- [demo source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/live.html)
