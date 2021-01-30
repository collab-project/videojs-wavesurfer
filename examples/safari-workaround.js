/* eslint-disable */

/* workaround safari issues */

var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

function addStartButton() {
    var btn = document.createElement('BUTTON');
    var t = document.createTextNode('Show player');
    btn.onclick = createPlayer;
    btn.appendChild(t);
    document.body.appendChild(btn);
}

function updateContext(opts) {
    // Safari 11 or newer automatically suspends new AudioContext's that aren't
    // created in response to a user-gesture, like a click or tap, so create one
    // here (inc. the script processor)
    var AudioContext = window.AudioContext || window.webkitAudioContext;
    var context = new AudioContext();
    var processor = context.createScriptProcessor(1024, 1, 1);

    opts.plugins.wavesurfer.audioContext = context;
    opts.plugins.wavesurfer.audioScriptProcessor = processor;
}

function enableTextTracks(opts) {
    // workaround for video.js issue with Safari text tracks
    // see https://github.com/videojs/video.js/issues/7015
    opts.html5 = {
        nativeTextTracks: false,
        vhs: {
            overrideNative: true
        }
    };
}
