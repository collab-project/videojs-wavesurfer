/**
 * @since 2.3.0
 */

import document from 'global/document';

import Player from 'video.js';


const TestHelpers = {

    /** Example audio clip */
    EXAMPLE_AUDIO_FILE: '/base/test/support/demo.wav',

    /** Length of example audio clip */
    EXAMPLE_AUDIO_DURATION: 0.782312925170068,

    /** Peaks data for example audio clip */
    EXAMPLE_AUDIO_PEAKS_FILE: '/base/test/support/demo-peaks.json',

    /**
     * Create DOM element.
     */
    makeTag(tag_type, id_name) {
        if (tag_type === undefined) {
            tag_type = 'audio';
        }
        if (id_name === undefined) {
            id_name = 'myAudio';
        }
        const tag = document.createElement(tag_type);
        tag.id = id_name;
        tag.muted = true;
        tag.className = 'video-js vjs-default-skin';
        tag.style = 'background-color: #F2E68A;';

        return tag;
    },

    /**
     * Create a test player containing the videojs-wavesurfer plugin.
     * 
     * @param  {Element|String} elementTag
     * @param  {Object} playerOptions
     */
    makePlayer(elementTag, playerOptions) {
        elementTag = elementTag || TestHelpers.makeTag();

        // add to dom
        document.getElementsByTagName('body')[0].appendChild(elementTag);

        // default options
        playerOptions = playerOptions || {
            controls: true,
            autoplay: false,
            fluid: false,
            loop: false,
            width: 600,
            height: 300,
            plugins: {
                wavesurfer: {
                    src: this.EXAMPLE_AUDIO_FILE,
                    msDisplayMax: 10,
                    debug: true,
                    waveColor: 'blue',
                    progressColor: 'black',
                    cursorColor: 'black',
                    hideScrollbar: true,
                    xhr: {}
                }
            }
        };

        return videojs(elementTag.id, playerOptions);
    },

    makeLivePlayer() {
        var tag = TestHelpers.makeTag('audio', 'liveAudio');
        return this.makePlayer(tag, {
            controls: true,
            autoplay: false,
            fluid: false,
            loop: false,
            width: 600,
            height: 300,
            plugins: {
                wavesurfer: {
                    src: 'live',
                    waveColor: 'black',
                    debug: true,
                    cursorWidth: 0,
                    interact: false,
                    hideScrollbar: true
                }
            }
        });
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