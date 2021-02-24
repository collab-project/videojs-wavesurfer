/**
 * @since 2.0.0
 */

import host from "@jsdevtools/host-environment";

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
            autoplay: true,
            plugins: {
                wavesurfer: {
                    backend: backend
                }
            }
        });

        // skip test in firefox until autoplay in headless browser is figured out
        if (host.browser.firefox) {
            done();
        }

        player.one(Event.ERROR, (element, error) => {
            fail(error);
        });
        player.one(Event.ENDED, done);

        // load file
        player.src(TestHelpers.EXAMPLE_AUDIO_SRC);
    });

    /** @test {Wavesurfer} */
    it('accepts formatTime option', (done) => {
        player = TestHelpers.makePlayer({
            height: 100,
            plugins: {
                wavesurfer: {
                    backend: backend,
                    formatTime: (seconds, guide) => `foo:${seconds}:${guide}`
                }
            }
        });

        player.one(Event.WAVE_READY, () => {
            expect(player.controlBar.currentTimeDisplay.formattedTime_).toEqual('foo:0:0');
            expect(player.controlBar.durationDisplay.formattedTime_.substring(0, 5)).toEqual('foo:0');
            done();
        });

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

    // run tests for each wavesurfer.js backend
    ws_options_test(TestHelpers.MEDIA_ELEMENT_BACKEND);
    ws_options_test(TestHelpers.MEDIA_ELEMENT_WEB_AUDIO_BACKEND);
    ws_options_test(TestHelpers.WEB_AUDIO_BACKEND);
});