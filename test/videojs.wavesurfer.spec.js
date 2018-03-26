/**
 * @since 2.3.0
 */

import TestHelpers from './test-helpers.js';

import Wavesurfer from '../src/js/videojs.wavesurfer.js';


/** @test {Wavesurfer} */
describe('Wavesurfer:', function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

    var player;
    var defaultOptions = {
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

    beforeAll(function(done) {
        player = TestHelpers.makePlayer(defaultOptions);
        player.on('ready', function() {
            done();
        });
    });

    afterAll(function() {
        player.dispose();

        expect(player.el()).toBeNull();
    });

    /** @test {Wavesurfer} */
    it('should create advanced plugin instance that inherits from component', function() {
        expect(player.el().nodeName).toEqual('DIV');
        expect(player.on).toBeFunction();
        expect(player.hasClass('videojs-wavesurfer')).toBeTrue();

        expect(videojs.getPlugin('wavesurfer')).toBeFunction();
        expect(videojs.getPluginVersion('wavesurfer')).toEqual('2.2.2');
    });
    
});
