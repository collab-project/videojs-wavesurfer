/**
 * @since 2.3.0
 */

import TestHelpers from './test-helpers.js';

// registers the plugin
import Wavesurfer from '../src/js/videojs.wavesurfer.js';


/** @test {Wavesurfer} */
describe('Wavesurfer', function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    var player;

    beforeEach(function() {
        // cleanup all players
        TestHelpers.cleanup();

        // create new player
        player = TestHelpers.makePlayer();
    });

    /** @test {Wavesurfer} */
    it('should be an advanced plugin instance', function(done) {

        player.one('ready', function() {
            expect(player.el().nodeName).toEqual('DIV');
            expect(player.on).toBeFunction();
            expect(player.hasClass('videojs-wavesurfer')).toBeTrue();

            // plugin exists
            expect(videojs.getPlugin('wavesurfer')).toBeFunction();

            // plugin version number is correct
            let version = require('../package.json').version;
            expect(videojs.getPluginVersion('wavesurfer')).toEqual(version);

            done();
        });
    });

    /** @test {Wavesurfer#play} */
    it('should play', function(done) {

        player.one('playbackFinish', done);
        player.one('waveReady', function() {
            // start playback
            player.wavesurfer().play();
        });
    });

    /** @test {Wavesurfer#pause} */
    it('should pause', function(done) {

        player.one('waveReady', function() {
            // start playback
            player.wavesurfer().play();

            // pause
            player.wavesurfer().pause();
            expect(player.paused()).toBeTrue();

            done();
        });
    });

    /** @test {Wavesurfer#getCurrentTime} */
    it('should get current time', function(done) {
        player.one('playbackFinish', function() {
            expect(player.wavesurfer().getCurrentTime()).toEqual(TestHelpers.WAVE_DURATION);

            done();
        });
        player.one('waveReady', function() {
            // initially 0
            expect(player.wavesurfer().getCurrentTime()).toEqual(0);

            // start playback until end
            player.wavesurfer().play();
        });
    });

    /** @test {Wavesurfer#setCurrentTime} */
    it('should set current time', function(done) {
        player.one('waveReady', function() {

            expect(player.wavesurfer().getCurrentTime()).toEqual(0);
            player.wavesurfer().setCurrentTime(0.123);

            // only updates player visually
            expect(player.controlBar.currentTimeDisplay.formattedTime_).toEqual('0:00:123');

            // invalid values result in 0
            player.wavesurfer().setCurrentTime('foo', 'bar');
            expect(player.controlBar.currentTimeDisplay.formattedTime_).toEqual('0:00');

            done();
        });
    });

    /** @test {Wavesurfer#getDuration} */
    it('should get duration', function(done) {
        player.one('waveReady', function() {

            expect(player.wavesurfer().getDuration()).toEqual(TestHelpers.WAVE_DURATION);

            done();
        });
    });

    /** @test {Wavesurfer#setDuration} */
    it('should set duration', function(done) {
        player.one('waveReady', function() {

            expect(player.wavesurfer().getDuration()).toEqual(TestHelpers.WAVE_DURATION);
            player.wavesurfer().setDuration(0.1);

            // only updates player visually
            expect(player.controlBar.durationDisplay.formattedTime_).toEqual('0:00:100');

            // invalid values result in 0
            player.wavesurfer().setDuration('foo');
            expect(player.controlBar.durationDisplay.formattedTime_).toEqual('0:00');

            done();
        });
    });
    
    /** @test {Wavesurfer#setVolume} */
    it('should set volume', function(done) {
        player.one('waveReady', function() {

            expect(player.volume()).toEqual(0);
            
            // invalid values are ignored
            player.wavesurfer().setVolume();
            expect(player.volume()).toEqual(0);

            player.wavesurfer().setVolume(0.1);
            expect(player.volume()).toEqual(0.1);

            done();
        });
    });

    /** @test {Wavesurfer#exportImage} */
    it('should export image', function(done) {
        player.one('waveReady', function() {

            // default to png
            let data = player.wavesurfer().exportImage();
            expect(data).toStartWith('data:image/png;base64,');

            // webp
            data = player.wavesurfer().exportImage('image/webp');
            expect(data).toStartWith('data:image/webp;base64,');

            // jpeg
            data = player.wavesurfer().exportImage('image/jpeg');
            expect(data).toStartWith('data:image/jpeg;base64,');

            done();
        });
    });

    /** @test {Wavesurfer#onWaveReady} */
    it('should fire waveReady event', function(done) {

        player.one('waveReady', function() {
            // play button is initially hidden
            expect(player.controlBar.playToggle.hasClass('vjs-hidden')).toBeTrue();

            expect(player.wavesurfer().waveReady).toBeTrue();
            expect(player.wavesurfer().waveFinished).toBeFalse();
            expect(player.wavesurfer().liveMode).toBeFalse();

            done();
        });
    });

    /** @test {Wavesurfer#onWaveFinish} */
    it('should fire playbackFinish event', function(done) {

        player.one('playbackFinish', done);
        player.one('waveReady', function() {
            expect(player.wavesurfer().waveFinished).toBeFalse();

            // start playback until end
            player.wavesurfer().play();
        });
    });

    /** @test {Wavesurfer#onWaveSeek} */
    it('should seek', function(done) {

        player.one('waveReady', function() {
            // initially 0
            expect(player.wavesurfer().getCurrentTime()).toEqual(0);

            // seek
            player.wavesurfer().surfer.seekTo(0.5);
            expect(player.wavesurfer().getCurrentTime()).toBeGreaterThan(0);

            done();
        });
    });

    /** @test {Wavesurfer#onPlayToggle} */
    it('should toggle play', function(done) {

        player.one('waveReady', function() {
            // display end of clip icon
            player.controlBar.playToggle.addClass('vjs-ended');

            // pause button initially visible
            expect(player.controlBar.playToggle.hasClass('vjs-playing')).toBeFalse();

            // trigger click event on playToggle button
            TestHelpers.triggerDomEvent(player.controlBar.playToggle.el(), 'click');

            // enabled the vjs-playing class
            expect(player.controlBar.playToggle.hasClass('vjs-playing')).toBeTrue();

            done();
        });
    });
});
