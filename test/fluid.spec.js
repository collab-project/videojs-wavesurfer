/**
 * @since 2.3.0
 */

import window from 'global/window';

import Event from '../src/js/event.js';

import TestHelpers from './test-helpers.js';

/** @test {Wavesurfer} */
describe('Wavesurfer Fluid', () => {
    let player;

    afterEach(() => {
        // destroy player
        player.dispose();
    });

    /** @test {Wavesurfer#redrawWaveform} */
    it('redraws the waveform', (done) => {
        let options = {
            fluid: true
        };
        player = TestHelpers.makePlayer(options);
        player.one(Event.WAVE_READY, () => {
            // class is present
            expect(player.hasClass('vjs-fluid')).toBeTrue();

            done();
        });

        player.src(TestHelpers.EXAMPLE_AUDIO_SRC);
    });

});