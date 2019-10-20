/**
 * @since 2.0.0
 */

import Event from '../src/js/event.js';

import TestHelpers from './test-helpers.js';

/** @test {Wavesurfer} */
describe('Wavesurfer options', () => {
    let player;

    afterEach(() => {
        // delete player
        player.dispose();
    });

    /** @test {Wavesurfer} */
    it('accepts waveformHeight option', (done) => {
        let height = 139;
        player = TestHelpers.makePlayer({
            plugins: {
                wavesurfer: {
                    waveformHeight: height
                }
            }
        });

        player.one(Event.WAVE_READY, () => {
            expect(player.wavesurfer().surfer.getHeight()).toEqual(height);

            done();
        });

        player.src(TestHelpers.EXAMPLE_AUDIO_SRC);
    });

    /** @test {Wavesurfer} */
    it('accepts splitChannels option', (done) => {
        player = TestHelpers.makePlayer({
            height: 100,
            plugins: {
                wavesurfer: {
                    splitChannels: true
                }
            }
        });

        player.one(Event.WAVE_READY, () => {
            expect(player.wavesurfer().surfer.getHeight()).toEqual(35);

            done();
        });

        player.src(TestHelpers.EXAMPLE_AUDIO_SRC);
    });

    /** @test {Wavesurfer} */
    it('accepts autoplay option', (done) => {
        player = TestHelpers.makePlayer({
            autoplay: true
        });

        player.one(Event.PLAYBACK_FINISH, done);

        player.src(TestHelpers.EXAMPLE_AUDIO_SRC);
    });

    /** @test {Wavesurfer} */
    it('accepts loop option', (done) => {
        player = TestHelpers.makePlayer({
            autoplay: true,
            loop: true
        });
        player.one('play', () => {
            done();
        });

        player.src(TestHelpers.EXAMPLE_AUDIO_SRC);
    });

});