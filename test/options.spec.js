/**
 * @since 2.0.0
 */

import Event from '../src/js/event.js';

import TestHelpers from './test-helpers.js';


let player;

function ws_options_test(backend) {
    /** @test {Wavesurfer} */
    it('accepts waveformHeight option', (done) => {
        let height = 139;
        // create player
        player = TestHelpers.makePlayer({
            plugins: {
                wavesurfer: {
                    backend: backend,
                    waveformHeight: height
                }
            }
        });

        player.one(Event.WAVE_READY, () => {
            expect(player.wavesurfer().surfer.getHeight()).toEqual(height);

            done();
        });

        // load file
        player.src(TestHelpers.EXAMPLE_AUDIO_SRC);
    });

    /** @test {Wavesurfer} */
    it('accepts splitChannels option', (done) => {
        player = TestHelpers.makePlayer({
            height: 100,
            plugins: {
                wavesurfer: {
                    backend: backend,
                    splitChannels: true
                }
            }
        });

        player.one(Event.WAVE_READY, () => {
            expect(player.wavesurfer().surfer.getHeight()).toEqual(35);

            done();
        });

        // load file
        player.src(TestHelpers.EXAMPLE_AUDIO_SRC);
    });

    /** @test {Wavesurfer} */
    it('accepts autoplay option', (done) => {
        player = TestHelpers.makePlayer({
            autoplay: 'any',
            plugins: {
                wavesurfer: {
                    backend: backend
                }
            }
        });

        player.one(Event.ERROR, (element, error) => {
            fail(error);
        });
        player.one(Event.PLAYBACK_FINISH, done);

        // load file
        player.src(TestHelpers.EXAMPLE_AUDIO_SRC);
    });

    /** @test {Wavesurfer} */
    it('accepts loop option', (done) => {
        player = TestHelpers.makePlayer({
            autoplay: true,
            loop: true,
            plugins: {
                wavesurfer: {
                    backend: backend
                }
            }
        });
        player.one(Event.ERROR, (element, error) => {
            fail(error);
        });

        if (backend === TestHelpers.WEB_AUDIO_BACKEND) {
            player.one(Event.PLAYBACK_FINISH, () => {
                // stop after it looped once
                player.one(Event.PLAYBACK_FINISH, done);
            });
        } else {
            player.one('play', () => {
                done();
            });
        }

        // load file
        player.src(TestHelpers.EXAMPLE_AUDIO_SRC);
    });
}

/** @test {Wavesurfer} */
describe('Wavesurfer options', () => {
    afterEach(() => {
        // delete player
        player.dispose();
    });

    ws_options_test(TestHelpers.MEDIA_ELEMENT_BACKEND);
    ws_options_test(TestHelpers.MEDIA_ELEMENT_WEB_AUDIO_BACKEND);
    ws_options_test(TestHelpers.WEB_AUDIO_BACKEND);
});