/**
 * @since 2.3.0
 */

import TestHelpers from './test-helpers.js';

/** @test {Wavesurfer} */
describe('Wavesurfer Live', function() {
    var player;

    beforeEach(function() {
        player = TestHelpers.makeLivePlayer();
    });

    afterEach(function() {
        // delete player
        player.dispose();
    });

    /** @test {Wavesurfer} */
    it('should start and pause microphone', function(done) {
        player.one('ready', function() {
            // trigger click event on playToggle button to start mic
            TestHelpers.triggerDomEvent(player.controlBar.playToggle.el(), 'click');

            player.wavesurfer().play();
            player.wavesurfer().pause();

            // mic is active for a while
            setTimeout(done, 1000);
        });
    });

});