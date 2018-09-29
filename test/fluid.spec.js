/**
 * @since 2.3.0
 */

import window from 'global/window';

import TestHelpers from './test-helpers.js';

/** @test {Wavesurfer} */
describe('Wavesurfer Fluid', () => {
    var player;

    beforeEach(() => {
        // create new player
        let options = {
            fluid: true,
            plugins: {
                wavesurfer: {
                    debug: false,
                    waveColor: 'yellow',
                    progressColor: '#FCF990',
                    cursorColor: '#FCFC42'
                }
            }
        };
        var tag = TestHelpers.makeTag('audio', 'fluidAudio');
        player = TestHelpers.makePlayer(options, tag);
    });

    afterEach(() => {
        // delete player
        player.dispose();
    });

    /** @test {Wavesurfer#redrawWaveform} */
    it('redraws the waveform', (done) => {
        player.one('waveReady', () => {
            player.wavesurfer().redrawWaveform(100, 200);

            done();
        });
    });

});