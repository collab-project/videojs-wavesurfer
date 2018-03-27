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

        // create audio element with text track
        const tag = TestHelpers.makeTag('audio', 'myAudioTextTracks');
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
    it('works', function(done) {

        player.one('waveReady', function() {
            // initially 0
            expect(player.tech_.currentTime()).toEqual(0);
            expect(player.tech_.duration()).toEqual(0);

            // override waveready for test
            expect(player.tech_.waveready).toBeFalse();
            player.tech_.waveready = true;

            // native text tracks are not allowed
            expect(player.tech_.options_.nativeTextTracks).toBeFalse();

            // text tracks UI is visible
            expect(player.controlBar.subsCapsButton.hasClass('vjs-hidden')).toBeFalse();

            // active player is available
            expect(player.tech_.activePlayer).toBeDefined();
            expect(player.tech_.activePlayer).toEqual(player);

            // change current time
            player.tech_.setCurrentTime(0.4);
            expect(player.tech_.currentTime()).toEqual(0.4);

            // duration
            expect(player.tech_.duration()).toEqual(WAVE_DURATION);

            // switch playback
            player.tech_.play();
            player.tech_.pause();

            // text track is present
            expect(player.textTracks().length).toEqual(1);

            done();
        });
    });
});