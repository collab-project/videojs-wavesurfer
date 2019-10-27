/**
 * @since 2.3.0
 */

import document from 'global/document';

import {Player, mergeOptions} from 'video.js';

const TestHelpers = {

    /** wavesurer.js backends to test against */
    MEDIA_ELEMENT_BACKEND: 'MediaElement',
    MEDIA_ELEMENT_WEB_AUDIO_BACKEND: 'MediaElementWebAudio',
    WEB_AUDIO_BACKEND: 'WebAudio',

    /** Example audio clip */
    EXAMPLE_AUDIO_FILE: '/base/test/support/demo.wav',

    /** Example audio clip mime-type */
    EXAMPLE_AUDIO_TYPE: 'audio/wav',

    /** Example audio src object */
    EXAMPLE_AUDIO_SRC: {
        src: '/base/test/support/demo.wav',
        type: 'audio/wav'
    },

    /** Length of example audio clip */
    EXAMPLE_AUDIO_DURATION: 0.782312925170068,

    /** Peaks data for example audio clip */
    EXAMPLE_AUDIO_PEAKS_FILE: '/base/test/support/demo-peaks.json',

    /** File with invalid peaks data */
    EXAMPLE_AUDIO_PEAKS_INVALID_FILE: '/base/test/support/demo-peaks-invalid.json',

    /** Example VTT clip */
    EXAMPLE_VTT_FILE: '/base/test/support/demo.vtt',

    /** Example video clip */
    EXAMPLE_VIDEO_FILE: '/base/test/support/stars.mp4',

    /** Example video clip mime-type */
    EXAMPLE_VIDEO_TYPE: 'video/mp4',

    /**
     * Create DOM element.
     */
    makeElement(element_type, id_name) {
        if (element_type === undefined) {
            element_type = 'audio';
        }
        if (id_name === undefined) {
            id_name = 'myAudio';
        }
        const element = document.createElement(element_type);
        element.id = id_name;
        element.muted = true;
        element.className = 'video-js vjs-default-skin';
        element.style = 'background-color: #F2E68A;';

        return element;
    },

    /**
     * Create a test player containing the videojs-wavesurfer plugin.
     *
     * @param  {Object} playerOptions
     * @param  {Element|String} elementTag
     */
    makePlayer(playerOptions, elementTag) {
        elementTag = elementTag || TestHelpers.makeElement();

        // add to dom
        document.getElementsByTagName('body')[0].appendChild(elementTag);

        // default options
        let opts = mergeOptions({
            controls: true,
            autoplay: false,
            fluid: false,
            loop: false,
            width: 600,
            height: 300,
            plugins: {
                wavesurfer: {
                    backend: 'MediaElement',
                    msDisplayMax: 10,
                    debug: true,
                    waveColor: 'blue',
                    progressColor: 'black',
                    cursorColor: 'black',
                    hideScrollbar: true,
                    xhr: {}
                }
            }
        }, playerOptions || {});

        return videojs(elementTag.id, opts);
    },

    /**
     * Dispose all players.
     */
    cleanup() {
        for (const playerId in Player.players) {
            if (Player.players[playerId] !== null) {
                Player.players[playerId].dispose();
            }
            delete Player.players[playerId];
        }
    },

    /**
     * Triggers an event on a DOM node natively.
     *
     * @param  {Element} element
     * @param  {string} eventType
     */
    triggerDomEvent(element, eventType) {
        let event;

        if (document.createEvent) {
            event = document.createEvent('HTMLEvents');
            event.initEvent(eventType, true, true);
        } else {
            event = document.createEventObject();
            event.eventType = eventType;
        }

        event.eventName = eventType;

        if (document.createEvent) {
            element.dispatchEvent(event);
        } else {
            element.fireEvent('on' + event.eventType, event);
        }
    }
};

export default TestHelpers;