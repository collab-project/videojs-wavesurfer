# Events

The events for this plugin are available on the video.js player instance.

For example:

```javascript
player.on('waveReady', function(event) {
    console.log('waveform is ready!');
});
```

| Event | Description |
| ----- | ----------- |
| `waveReady` | Audio is loaded, decoded and the waveform is drawn. |
| `playbackFinish` | Audio playback finished. |
| `audioOutputReady` | Audio output was changed and is now active. |
| `abort` | Audio loading process was interrupted and cancelled. |
| `error` | Error occurred. |
