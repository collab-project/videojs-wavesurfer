/**
 * @since 3.0.0
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
    });

    /** @test {Wavesurfer#startPlayers} */
    it('hides loading spinner when no valid src is found', (done) => {
        player = TestHelpers.makePlayer({
            plugins: {
                wavesurfer: {
                    src: undefined
                }
            }
        });

        player.one(Event.READY, () => {
            expect(player.loadingSpinner.hasClass('vjs-hidden')).toBeTrue();

            done();
        });
    });

    /** @test {Wavesurfer} */
    it('accepts autoplay option', (done) => {
        player = TestHelpers.makePlayer({
            autoplay: true
        });

        player.one(Event.PLAYBACK_FINISH, done);
    });

    /** @test {Wavesurfer} */
    it('accepts loop option', (done) => {
        player = TestHelpers.makePlayer({
            autoplay: true,
            loop: true
        });

        player.one(Event.PLAYBACK_FINISH, () => {
            // stop after it looped once
            player.one(Event.PLAYBACK_FINISH, done);
        });
    });

});