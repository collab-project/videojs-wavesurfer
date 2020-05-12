# Text Tracks

Text tracks (or captions/subtitles) are a feature of HTML5 for displaying
time-triggered text to the user. Video.js offers a cross-browser implementation
of text tracks.

For more information, check the video.js
[text tracks documentation](https://github.com/videojs/video.js/blob/master/docs/guides/text-tracks.md).

## Example

- [online demo](https://collab-project.github.io/videojs-wavesurfer/demo/texttrack.html)
- [demo source](https://github.com/collab-project/videojs-wavesurfer/blob/master/examples/texttrack.html)

## Usage

Create an array for the text track(s) you want to use:

```javascript
let textTracks = [
    {
        kind: 'captions',
        srclang: 'en',
        label: 'English',
        src: 'media/hal.vtt',
        mode: 'showing',
        default: true
    }
];
```

And pass it to the video.js `tracks` option:

```javascript
const options = {
    tracks: textTracks,
    plugins: {
        // etc...
    }
};
```

![Text tracks screenshot](img/text-tracks.png?raw=true "Text tracks screenshot")
