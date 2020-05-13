# Options

Configure the player with:

- [video.js options](https://github.com/videojs/video.js/blob/master/docs/guides/options.md)
- [wavesurfer.js options](https://wavesurfer-js.org/docs/options.html)

Additional options for this plugin are:

| option | type | default | description |
| ------ | ---- | ------- | ----------- |
| `peaks` | string | `null` | The URL of the JSON file with peaks data corresponding to the source audio/video file. See the [peaks documentation](peaks.md) for more information. |
| `debug` | boolean | `false` | Display internal log messages using the `videojs.log` method. |
| `msDisplayMax` | float | `3` | Indicates the number of seconds that is considered the boundary value for displaying milliseconds in the time controls. An audio clip with a total length of 2 seconds and a `msDisplayMax` of 3 will use the format `M:SS:MMM`. Clips with a duration that is longer than `msDisplayMax` will be displayed as `M:SS` or `HH:MM:SS`.|
