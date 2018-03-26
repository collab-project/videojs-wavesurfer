/**
 * @since 2.3.0
 */

import document from 'global/document';

const TestHelpers = {
    makeTag() {
        const audioTag = document.createElement('audio');
        audioTag.id = 'myAudio';
        audioTag.className = 'video-js vjs-default-skin';
        audioTag.style = 'background-color: #F2E68A;';

        return audioTag;
    },

    makePlayer(playerOptions, audioTag) {
        audioTag = audioTag || TestHelpers.makeTag();

        // add to dom
        document.getElementsByTagName('body')[0].appendChild(audioTag);

        return videojs(audioTag.id, playerOptions);
    }
};

export default TestHelpers;