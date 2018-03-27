/**
 * @since 2.3.0
 */

import document from 'global/document';

const TestHelpers = {
    makeTag() {
        const audioTag = document.createElement('audio');
        audioTag.id = 'myAudio';
        audioTag.muted = true;
        audioTag.className = 'video-js vjs-default-skin';
        audioTag.style = 'background-color: #F2E68A;';

        return audioTag;
    },

    makePlayer(playerOptions, audioTag) {
        audioTag = audioTag || TestHelpers.makeTag();

        // add to dom
        document.getElementsByTagName('body')[0].appendChild(audioTag);

        playerOptions = playerOptions || {};

        return videojs(audioTag.id, playerOptions);
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