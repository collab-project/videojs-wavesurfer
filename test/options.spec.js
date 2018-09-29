/**
 * @since 3.0.0
 */

import TestHelpers from './test-helpers.js';

/** @test {Wavesurfer} */
describe('Wavesurfer options', () => {
    var player;

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

});