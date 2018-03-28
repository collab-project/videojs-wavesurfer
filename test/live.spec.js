/**
 * @since 2.3.0
 */

import TestHelpers from './test-helpers.js';


/** @test {Wavesurfer} */
describe('Wavesurfer Live', function() {
    var player;

    beforeEach(function() {
        // cleanup all players
        TestHelpers.cleanup();

        // create new player
        let options = {
            controls: true,
            fluid: false,
            width: 600,
            height: 300,
            controlBar: {
                currentTimeDisplay: false,
                timeDivider: false,
                durationDisplay: false,
                remainingTimeDisplay: false,
                volumePanel: false
            },
            plugins: {
                wavesurfer: {
                    src: 'live',
                    waveColor: 'black',
                    debug: false,
                    cursorWidth: 0,
                    interact: false,
                    hideScrollbar: true
                }
            }
        };
        player = TestHelpers.makePlayer(undefined, options);
    });

    /** @test {Wavesurfer} */
    it('should start and pause microphone', function(done) {
        player.one('ready', function() {
            // trigger click event on playToggle button to start mic
            TestHelpers.triggerDomEvent(player.controlBar.playToggle.el(), 'click');

            player.wavesurfer().pause();
            player.wavesurfer().play();
            player.wavesurfer().play();

            done();
        });
    });

});