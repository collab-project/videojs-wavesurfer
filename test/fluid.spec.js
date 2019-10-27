/**
 * @since 2.3.0
 */

import window from 'global/window';

import Event from '../src/js/event.js';

import TestHelpers from './test-helpers.js';


let player;

function fluid_test(backend) {
    /** @test {Wavesurfer#redrawWaveform} */
    it('redraws the waveform', (done) => {
        let options = {
            fluid: true,
            plugins: {
                wavesurfer: {
                    backend: backend
                }
            }
        };
        player = TestHelpers.makePlayer(options);
        player.one(Event.WAVE_READY, () => {
            // class is present
            expect(player.hasClass('vjs-fluid')).toBeTrue();

            done();
        });

        // load file
        player.src(TestHelpers.EXAMPLE_AUDIO_SRC);
    });
}

/** @test {Wavesurfer} */
describe('Wavesurfer Fluid', () => {
    afterEach(() => {
        // destroy player
        player.dispose();
    });

    fluid_test(TestHelpers.MEDIA_ELEMENT_BACKEND);
    fluid_test(TestHelpers.WEB_AUDIO_BACKEND);
    fluid_test(TestHelpers.MEDIA_ELEMENT_WEB_AUDIO_BACKEND);
});