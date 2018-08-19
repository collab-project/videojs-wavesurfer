/**
 * @since 2.3.0
 */

import TestHelpers from './test-helpers.js';

/** @test {Wavesurfer} */
describe('Wavesurfer Live', () => {
    var player;

    beforeEach(() => {
        player = TestHelpers.makeLivePlayer();
    });

    afterEach(() => {
        // delete player
        player.dispose();
    });

    /** @test {Wavesurfer} */
    it('starts and pauses the microphone', (done) => {
        player.one('ready', () => {
            // trigger click event on playToggle button to start mic
            TestHelpers.triggerDomEvent(player.controlBar.playToggle.el(), 'click');

            player.wavesurfer().play();
            player.wavesurfer().pause();

            // mic is active for a while
            setTimeout(done, 1000);
        });
    });

});