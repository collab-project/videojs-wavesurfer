# Options

Configure the player with:

- [video.js options](https://github.com/videojs/video.js/blob/master/docs/guides/options.md)
- [wavesurfer.js options](https://wavesurfer-js.org/docs/options.html)

Additional options for this plugin are:

| option | type | default | description |
| ------ | ---- | ------- | ----------- |
| `debug` | boolean | `false` | Display internal log messages using the `videojs.log` method. |
| `displayMilliseconds` | boolean | `true` | Indicates if milliseconds should be included in time displays, e.g. `00:00:000` vs `00:00`. |
| `formatTime` | function | builtin `formatTime` | Use a custom time format function. For example: ```(seconds, guide) => `test:${seconds}:${guide} ``` |
