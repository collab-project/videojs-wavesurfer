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

    /** @test {Wavesurfer#getDuration} */
    it('should return duration', function(done) {

        player.on('waveReady', function() {

            expect(player.wavesurfer().getDuration()).toBe(WAVE_DURATION);
            
            done();
        });
    });
});
