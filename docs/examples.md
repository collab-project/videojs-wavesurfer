# Examples

## Online demos

View the examples online:

| Example | Description | Demo | Source |
| --- | --- | --- | --- |
| **Audio** | Basic audio example | [online demo](https://collab-project.github.io/videojs-wavesurfer/demo/index.html) | [example source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/index.html) |
| **Video** | Basic video example | [online demo](https://collab-project.github.io/videojs-wavesurfer/demo/video.html) | [example source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/video.html) |
| **Responsive** | Enable [responsive layout](responsive.md) | [online demo](https://collab-project.github.io/videojs-wavesurfer/demo/fluid.html) | [example source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/fluid.html) |
| **Text tracks** | Display [text tracks](text-tracks.md) | [online demo](https://collab-project.github.io/videojs-wavesurfer/demo/texttrack.html) | [example source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/texttrack.html) |
| **Microphone** | Real-time waveform rendering of [microphone](microphone.md) | [online demo](https://collab-project.github.io/videojs-wavesurfer/demo/live.html) | [example source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/live.html) |
| **Peaks** | Use JSON [peaks data](peaks.md) to render waveform | [online demo](https://collab-project.github.io/videojs-wavesurfer/demo/peaks.html) | [example source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/peaks.html) |
| **Output device** | Change audio [output device](change-device.md) | [online demo](https://collab-project.github.io/videojs-wavesurfer/demo/output.html) | [example source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/output.html) |
| **Input device** | Change audio [input device](change-device.md) | [online demo](https://collab-project.github.io/videojs-wavesurfer/demo/input.html) | [example source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/input.html) |
| **Plugin** | Enable additional [wavesurfer.js plugins](plugins.md) | [online demo](https://collab-project.github.io/videojs-wavesurfer/demo/plugin.html) | [example source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/plugin.html) |
| **React** | Basic [React](react.md) example | [online demo](https://collab-project.github.io/videojs-wavesurfer/demo/react/index.html) | [example source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/react/index.html) |

## Local setup

To try out the examples locally either:

- download the [zipfile](https://github.com/collab-project/videojs-wavesurfer/archive/master.zip) and unpack it
- or checkout the repository with Git:
```console
git clone https://github.com/collab-project/videojs-wavesurfer.git
```

1. Install the dependencies:

```console
cd /path/to/videojs-wavesurfer
npm install
```

2. Build the library and assets once:

```console
npm run build
```

3. And start the local examples webserver:

```console
npm run start
```

Open http://localhost:8080/examples/index.html in a browser.
