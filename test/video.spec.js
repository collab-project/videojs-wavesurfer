/**
 * @since 3.0.0
 */

import window from 'global/window';

import Event from '../src/js/event.js';

import TestHelpers from './test-helpers.js';

let player, element;

function video_test(test_backend) {
    /** @test {Wavesurfer#redrawWaveform} */
    it('draw waveform for video', (done) => {
        let opts = {
            plugins: {
                wavesurfer: {
                    backend: test_backend
                }
            }
        };
        element = TestHelpers.makeElement('video', 'testVideo');
        player = TestHelpers.makePlayer(opts, element);
        player.one(Event.ERROR, (element, error) => {
            fail(error);
        });
        player.one(Event.WAVE_READY, done);

        // load file
        player.src({
            src: TestHelpers.EXAMPLE_VIDEO_FILE,
            type: TestHelpers.EXAMPLE_VIDEO_TYPE
        });
    });
}

/** @test {Wavesurfer} */
describe('Wavesurfer Video', () => {

    afterEach(() => {
        // destroy player
        player.dispose();
    });

    video_test(TestHelpers.MEDIA_ELEMENT_BACKEND);
    video_test(TestHelpers.MEDIA_ELEMENT_WEB_AUDIO_BACKEND);
    video_test(TestHelpers.WEB_AUDIO_BACKEND);
});