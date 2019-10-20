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
    it('microphone plugin is enabled', (done) => {
        player = TestHelpers.makeLivePlayer();

        player.one(Event.READY, () => {
            expect(player.wavesurfer().liveMode).toBeTrue();
            expect(player.wavesurfer().waveReady).toBeTrue();
            expect(player.wavesurfer().surfer.microphone).toBeDefined();

            done();
        });
    });

});