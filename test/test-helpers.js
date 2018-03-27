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

    getComputedStyle(el, rule) {
        if (document.defaultView && document.defaultView.getComputedStyle) {
          return document.defaultView.getComputedStyle(el, null).getPropertyValue(rule);
        }

        return '';
    }
};

export default TestHelpers;