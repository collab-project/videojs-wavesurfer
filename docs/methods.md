# Methods

Methods for this plugin are documented below. These are available on the
`wavesurfer` plugin instance of the video.js player.

For example:

```javascript
player.on('ready', function() {
    player.wavesurfer().destroy();
});
```

| Method | Description |
| ------ | ----------- |
| `destroy` | Destroys the wavesurfer instance and children (including the video.js player). |
| `load(url)` | Load the clip at `url`. Also supports loading [File](https://developer.mozilla.org/nl/docs/Web/API/File) or [Blob](https://developer.mozilla.org/nl/docs/Web/API/Blob) objects. |
| `setVolume(level)` | Set the volume level (value between 0.0 and 1.0). |
| `play` | Start playback. |
| `pause` | Pause playback. |
| `getDuration` | Get the length of the stream in seconds. Returns 0 if no stream is available (yet). |
| `getCurrentTime` | Get the current time (in seconds) of the stream during playback. Returns 0 if no stream is available (yet). |
| `exportImage(format, quality)` | Save waveform image as data URI. Default format is `'image/png'`. |
| `setAudioOutput(deviceId)` | Change the audio output device using its [deviceId](https://developer.mozilla.org/en-US/docs/Web/API/MediaDeviceInfo/deviceId). |

## Other wavesurfer.js methods

You can access the wavesurfer instance, for example to call the
wavesurfer.js `seekTo` method, by using the `surfer` property of the
`wavesurfer` plugin instance:

```javascript
player.wavesurfer().surfer.seekTo(1);
```
