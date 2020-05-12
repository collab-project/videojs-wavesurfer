# Using peaks for large audio files

When you're dealing with long audio files, it's sometimes useful to generate the waveform data,
called peaks, on the server. This allows wavesurfer.js to load the peaks JSON data and create the
waveform from that pre-rendered peak data. This JSON file can be generated using the
[bbc/audiowaveform](https://github.com/bbc/audiowaveform) utility.

For more information, see the wavesurfer.js [FAQ](https://wavesurfer-js.org/faq/).

## Example

- [online demo](https://collab-project.github.io/videojs-wavesurfer/demo/peaks.html)
- [demo source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/peaks.html)

## Usage

Load peaks data:

```javascript
// load file with peaks
player.src({
    src: 'media/hal.wav',
    type: 'audio/wav',
    // Use peaks from JSON file. See https://wavesurfer-js.org/faq/
    // for instructions on how to generate peaks
    peaks: 'media/hal-peaks.json'
});
```
