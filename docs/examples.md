# Examples

## Online demos

View the examples online:

| Example | Description | Source |
| --- | --- | --- |
| [Audio](https://collab-project.github.io/videojs-wavesurfer/demo/index.html) | Basic audio example | [example source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/index.html) |
| [Video](https://collab-project.github.io/videojs-wavesurfer/demo/video.html) | Basic video example | [example source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/video.html) |
| [Responsive](https://collab-project.github.io/videojs-wavesurfer/demo/fluid.html) | Enable [responsive layout](responsive.md) | [example source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/fluid.html) |
| [Text tracks](https://collab-project.github.io/videojs-wavesurfer/demo/texttrack.html) | Display [text tracks](text-tracks.md) | [example source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/texttrack.html) |
| [Microphone](https://collab-project.github.io/videojs-wavesurfer/demo/live.html) | Real-time waveform rendering of [microphone](microphone.md) | [example source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/live.html) |
| [Peaks](https://collab-project.github.io/videojs-wavesurfer/demo/peaks.html) | Use JSON [peaks data](peaks.md) to render waveform | [example source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/peaks.html) |
| [Output device](https://collab-project.github.io/videojs-wavesurfer/demo/output.html) | Change audio [output device](change-device.md) | [example source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/output.html) |
| [Input device](https://collab-project.github.io/videojs-wavesurfer/demo/input.html) | Change audio [input device](change-device.md) | [example source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/input.html) |
| [Plugin](https://collab-project.github.io/videojs-wavesurfer/demo/plugin.html) | Enable additional [wavesurfer.js plugins](plugins.md) | [example source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/plugin.html) |
| [React](https://collab-project.github.io/videojs-wavesurfer/demo/react/index.html) | Basic [React](react.md) example | [example source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/react/index.html) |
| [Multi](https://collab-project.github.io/videojs-wavesurfer/demo/multi.html) | Using multiple players on single page | [example source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/multi.html) |

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
