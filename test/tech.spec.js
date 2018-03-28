/**
 * @since 2.3.0
 */

import TestHelpers from './test-helpers.js';


/** @test {WavesurferTech} */
describe('WavesurferTech', function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    var player;

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
    it('should display interface elements', function(done) {

        player.one('waveReady', function() {
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

            // text track is present
            expect(player.textTracks().length).toEqual(1);

            done();
        });
    });

    /** @test {WavesurferTech#setCurrentTime} */
    it('should get and set current time', function(done) {

        player.one('waveReady', function() {
            let newTime = 0.4;
            // initially 0
            expect(player.tech_.currentTime()).toEqual(0);
            
            // as long as waveready is false, setting it will return 0
            expect(player.tech_.setCurrentTime(newTime)).toEqual(0);

            // override waveready for test
            player.tech_.waveready = true;

            // change current time
            player.tech_.setCurrentTime(newTime);
            expect(player.tech_.currentTime()).toEqual(newTime);

            done();
        });
    });

    /** @test {WavesurferTech#duration} */
    it('should get and set duration', function(done) {

        player.one('waveReady', function() {
            // initially 0
            expect(player.tech_.duration()).toEqual(0);

            // override waveready for test
            player.tech_.waveready = true;

            // duration
            expect(player.tech_.duration()).toEqual(TestHelpers.WAVE_DURATION);

            done();
        });
    });

    /** @test {WavesurferTech#duration} */
    it('should play and pause', function(done) {

        player.one('waveReady', function() {
            // override waveready for test
            player.tech_.waveready = true;

            // switch playback
            player.tech_.play();
            player.tech_.pause();

            done();
        });
    });

    /** @test {WavesurferTech#setPlaybackRate} */
    it('should set playbackrate', function(done) {

        player.one('waveReady', function() {
            let rate = 0.5;
            player.tech_.setPlaybackRate(rate);
            expect(
                player.tech_.activePlayer.activeWavesurferPlugin.surfer.getPlaybackRate()
            ).toEqual(rate);

            done();
        });
    });
});