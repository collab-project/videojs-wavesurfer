/**
 * @since 3.0.0
 */

import window from 'global/window';

import Event from '../src/js/event.js';

import TestHelpers from './test-helpers.js';

/** @test {Wavesurfer} */
describe('Wavesurfer Video', () => {
    let player, tag;

    afterEach(() => {
        // destroy player
        player.dispose();
    });

    /** @test {Wavesurfer#redrawWaveform} */
    it('draw waveform for video', (done) => {
        tag = TestHelpers.makeTag('video', 'testVideo');
        player = TestHelpers.makePlayer({}, tag);
        player.one(Event.WAVE_READY, done);

        player.src({
            src: TestHelpers.EXAMPLE_VIDEO_FILE,
            type: TestHelpers.EXAMPLE_VIDEO_TYPE
        });
    });

});