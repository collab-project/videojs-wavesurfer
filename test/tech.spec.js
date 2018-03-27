/**
 * @since 2.3.0
 */

import TestHelpers from './test-helpers.js';

/** @test {WavesurferTech} */
describe('WavesurferTech', function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    var player;
    var WAVE_DURATION = 0.782312925170068;

    beforeEach(function() {
        // cleanup all players
        TestHelpers.cleanup();

        const tag = document.createElement('audio');
        tag.id = 'myAudioTextTracks';
        tag.muted = true;
        tag.className = 'video-js vjs-default-skin';
        tag.style = 'background-color: #F2E68A;';
        
        const track = document.createElement('track');
        track.kind = 'captions';
        track.src = '/base/test/support/demo.vtt';
        track.srclang = 'en-US';
        track.default = true;
        tag.appendChild(track);

        // create new player
        player = TestHelpers.makePlayer(tag);
    });

    /** @test {WavesurferTech} */
    it('should display text tracks UI', function(done) {

        player.one('waveReady', function() {
            // text tracks UI is visible
            expect(player.controlBar.subsCapsButton.hasClass('vjs-hidden')).toBeFalse();

            done();
        });
    });
});