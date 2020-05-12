# Change device

## Output

### Example

- [online demo](https://collab-project.github.io/videojs-wavesurfer/demo/output.html)
- [demo source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/output.html)


### Usage

If your device has multiple audio output devices, use `setAudioOutput(deviceId)` to change
the active audio output device, and listen for the `audioOutputReady` event to be notified
when the new output device is active.

```javascript
// change audio output device
player.wavesurfer().setAudioOutput(deviceId);
```

## Input

If your device has multiple audio input devices and you want to display
these devices and allow the user to choose one, check out the input example.

#### Example

- [online demo](https://collab-project.github.io/videojs-wavesurfer/demo/input.html)
- [demo source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/input.html)
