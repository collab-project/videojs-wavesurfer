/**
 * @since 2.3.0
 */

import TestHelpers from './test-helpers.js';

import Player from 'video.js';

import Wavesurfer from '../src/js/videojs.wavesurfer.js';


/** @test {Wavesurfer} */
describe('Wavesurfer', function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

    var player;
    var WAVE_DURATION = 0.782312925170068;

    var defaultOptions = {
        controls: true,
        autoplay: false,
        fluid: false,
        loop: false,
        width: 600,
        height: 300,
        plugins: {
            wavesurfer: {
                src: '/base/test/support/demo.wav',
                msDisplayMax: 10,
                debug: true,
                waveColor: 'grey',
                progressColor: 'black',
                cursorColor: 'black',
                hideScrollbar: true
            }
        }
    };

    beforeEach(function() {
        // cleanup all players
        for (const playerId in Player.players) {
            if (Player.players[playerId] !== null) {
              Player.players[playerId].dispose();
            }
            delete Player.players[playerId];
        }
        player = TestHelpers.makePlayer(defaultOptions);
    });

    /** @test {Wavesurfer} */
    it('should be an advanced plugin instance', function(done) {
        player.on('ready', function() {

            expect(player.el().nodeName).toEqual('DIV');
            expect(player.on).toBeFunction();
            expect(player.hasClass('videojs-wavesurfer')).toBeTrue();

            let version = require('../package.json').version;
            expect(videojs.getPlugin('wavesurfer')).toBeFunction();
            expect(videojs.getPluginVersion('wavesurfer')).toEqual(version);

            done();
        });
    });

    /** @test {Wavesurfer#play} */
    it('should play', function(done) {

        player.on('playbackFinish', done);
        player.on('waveReady', function() {
            // start playback
            player.wavesurfer().play();
        });
    });

    /** @test {Wavesurfer#pause} */
    it('should pause', function(done) {

        player.on('waveReady', function() {
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
        player.on('playbackFinish', function() {
            expect(player.wavesurfer().getCurrentTime()).toEqual(WAVE_DURATION);

            done();
        });
        player.on('waveReady', function() {
            // initially 0
            expect(player.wavesurfer().getCurrentTime()).toEqual(0);

            // start playback until end
            player.wavesurfer().play();
        });
    });

    /** @test {Wavesurfer#setCurrentTime} */
    it('should set current time', function(done) {
        player.on('waveReady', function() {

            expect(player.wavesurfer().getCurrentTime()).toEqual(0);
            player.wavesurfer().setCurrentTime(0.21);

            // only updates player visually
            expect(player.controlBar.currentTimeDisplay.formattedTime_).toEqual('0:00:210');

            done();
        });
    });

    /** @test {Wavesurfer#getDuration} */
    it('should get duration', function(done) {
        player.on('waveReady', function() {

            expect(player.wavesurfer().getDuration()).toEqual(WAVE_DURATION);

            done();
        });
    });

    /** @test {Wavesurfer#setDuration} */
    it('should set duration', function(done) {
        player.on('waveReady', function() {

            expect(player.wavesurfer().getDuration()).toEqual(WAVE_DURATION);
            player.wavesurfer().setDuration(0.1);

            // only updates player visually
            expect(player.controlBar.durationDisplay.formattedTime_).toEqual('0:00:100');

            done();
        });
    });

    /** @test {Wavesurfer#exportImage} */
    it('should export image', function(done) {
        player.on('waveReady', function() {

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
});
