/**
 * @since 3.0.0
 */

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

        player.one('waveReady', () => {
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

        player.one('waveReady', () => {
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

        player.one('ready', () => {
            expect(player.loadingSpinner.hasClass('vjs-hidden')).toBeTrue();

            done();
        });
    });

    /** @test {Wavesurfer} */
    it('accepts autoplay option', (done) => {
        player = TestHelpers.makePlayer({
            autoplay: true
        });

        player.one('playbackFinish', done);
    });

    /** @test {Wavesurfer} */
    it('accepts loop option', (done) => {
        player = TestHelpers.makePlayer({
            autoplay: true,
            loop: true
        });

        player.one('playbackFinish', () => {
            // stop after it looped once
            player.one('playbackFinish', done);
        });
    });

});