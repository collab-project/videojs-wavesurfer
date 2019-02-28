/**
 * @since 2.3.0
 */

import Event from '../src/js/event.js';

import TestHelpers from './test-helpers.js';

/** @test {Wavesurfer} */
describe('Wavesurfer Live', () => {
    let player;

    afterEach(() => {
        // delete player
        player.dispose();
    });

    /** @test {Wavesurfer} */
    it('starts and pauses the microphone', (done) => {
        player = TestHelpers.makeLivePlayer();

        player.one(Event.READY, () => {
            // trigger click event on playToggle button to start mic
            TestHelpers.triggerDomEvent(player.controlBar.playToggle.el(),
                'click');

            player.wavesurfer().play();
            player.wavesurfer().pause();

            // mic is active for a while
            setTimeout(done, 1000);
        });
    });

    /** @test {Wavesurfer} */
    it('throws error when microphone plugin is missing', () => {
        let plugin = WaveSurfer.microphone;
        WaveSurfer.microphone = undefined;

        player = TestHelpers.makeLivePlayer();

        WaveSurfer.microphone = plugin;
    });

});