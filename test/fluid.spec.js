/**
 * @since 2.3.0
 */

import window from 'global/window';

import TestHelpers from './test-helpers.js';


/** @test {Wavesurfer} */
describe('Wavesurfer Fluid', function() {
    var player;

    beforeEach(function() {
        // cleanup all players
        TestHelpers.cleanup();

        // create new player
        let options = {
            controls: true,
            autoplay: false,
            fluid: true,
            plugins: {
                wavesurfer: {
                    src: TestHelpers.EXAMPLE_AUDIO_FILE,
                    msDisplayMax: 10,
                    debug: false,
                    waveColor: 'yellow',
                    progressColor: '#FCF990',
                    cursorColor: '#FCFC42',
                    hideScrollbar: true
                }
            }
        };
        player = TestHelpers.makePlayer(undefined, options);
    });

    /** @test {Wavesurfer#redrawWaveform} */
    it('should redraw waveform', function(done) {
        player.one('waveReady', function() {
            player.wavesurfer().redrawWaveform(100, 200);
            done();
        });
    });

});