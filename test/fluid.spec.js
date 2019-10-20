/**
 * @since 2.3.0
 */

import window from 'global/window';

import Event from '../src/js/event.js';

import TestHelpers from './test-helpers.js';

/** @test {Wavesurfer} */
describe('Wavesurfer Fluid', () => {
    let player;

    beforeEach(() => {
        // create new player
        let options = {
            controls: true,
            autoplay: false,
            fluid: true,
            loop: false,
            plugins: {
                wavesurfer: {
                    backend: 'MediaElement',
                    debug: false,
                    waveColor: 'yellow',
                    progressColor: '#FCF990',
                    cursorColor: '#FCFC42'
                }
            }
        };
        let tag = TestHelpers.makeTag('audio', 'fluidAudio');
        player = TestHelpers.makePlayer(options, tag);
    });

    afterEach(() => {
        // delete player
        player.dispose();
    });

    /** @test {Wavesurfer#redrawWaveform} */
    it('redraws the waveform', (done) => {
        player.one(Event.WAVE_READY, () => {

            done();
        });

        player.src(TestHelpers.EXAMPLE_AUDIO_SRC);
    });

});