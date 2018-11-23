/**
 * @since 2.3.0
 */

import TestHelpers from './test-helpers.js';

// registers the plugin (once)
import Wavesurfer from '../src/js/videojs.wavesurfer.js';


/** @test {Wavesurfer} */
describe('Wavesurfer', () => {
    let player;
    let originalTimeout;

    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

        // create new player
        player = TestHelpers.makePlayer();
    });

    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;

        try {
            player.dispose();
        } catch (err) {}
    });

    /** @test {Wavesurfer} */
    it('is an advanced plugin instance', (done) => {

        player.one('ready', () => {
            expect(player.el().nodeName).toEqual('DIV');
            expect(player.on).toBeFunction();
            expect(player.hasClass('vjs-wavesurfer')).toBeTrue();

            // plugin exists
            expect(videojs.getPlugin('wavesurfer')).toBeFunction();

            // plugin version number is correct
            let version = require('../package.json').version;
            expect(videojs.getPluginVersion('wavesurfer')).toEqual(version);

            done();
        });
    });

    /** @test {Wavesurfer#play} */
    it('starts playback', (done) => {

        player.one('waveReady', () => {
            player.one('playbackFinish', done);
            // start playback
            player.wavesurfer().play();
        });
    });

    /** @test {Wavesurfer#pause} */
    it('pauses playback', (done) => {

        player.one('waveReady', () => {
            // start playback
            player.wavesurfer().play();

            // pause
            player.wavesurfer().pause();
            expect(player.paused()).toBeTrue();

            done();
        });
    });

    /** @test {Wavesurfer#destroy} */
    it('destroys player', (done) => {

        player.one('waveReady', () => {
            // die
            player.wavesurfer().destroy();

            done();
        });
    });

    /** @test {Wavesurfer#getCurrentTime} */
    it('get current time', (done) => {

        player.one('playbackFinish', () => {
            expect(player.wavesurfer().getCurrentTime()).toBeNear(
                TestHelpers.EXAMPLE_AUDIO_DURATION, 0.01);
            done();
        });

        player.one('waveReady', () => {
            // initially 0
            expect(player.wavesurfer().getCurrentTime()).toEqual(0);

            // start playback until end
            player.wavesurfer().play();
        });
    });

    /** @test {Wavesurfer#setCurrentTime} */
    it('set current time', (done) => {

        player.one('waveReady', () => {

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
    it('get duration', (done) => {

        player.one('waveReady', () => {

            expect(player.wavesurfer().getDuration()).toBeNear(
                TestHelpers.EXAMPLE_AUDIO_DURATION, 0.01);

            done();
        });
    });

    /** @test {Wavesurfer#setDuration} */
    it('set duration', (done) => {

        player.one('waveReady', () => {

            expect(player.wavesurfer().getDuration()).toBeNear(
                TestHelpers.EXAMPLE_AUDIO_DURATION, 0.01);
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
    it('set volume', (done) => {

        player.one('waveReady', () => {

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
    it('exports image', (done) => {

        player.one('waveReady', () => {

            // default to png
            let data = player.wavesurfer().exportImage();
            expect(data).toStartWith('data:image/png;base64,');

            // webp
            data = player.wavesurfer().exportImage('image/webp');
            expect(data).toStartWith('data:image');

            // jpeg
            data = player.wavesurfer().exportImage('image/jpeg');
            expect(data).toStartWith('data:image/jpeg;base64,');

            done();
        });
    });

    /** @test {Wavesurfer#onWaveReady} */
    it('fires waveReady event', (done) => {

        player.one('waveReady', () => {
            // play button is initially hidden
            expect(player.controlBar.playToggle.hasClass('vjs-hidden')).toBeTrue();

            expect(player.wavesurfer().waveReady).toBeTrue();
            expect(player.wavesurfer().waveFinished).toBeFalse();
            expect(player.wavesurfer().liveMode).toBeFalse();

            done();
        });
    });

    /** @test {Wavesurfer#onWaveFinish} */
    it('fires playbackFinish event', (done) => {

        player.one('playbackFinish', done);
        player.one('waveReady', () => {
            expect(player.wavesurfer().waveFinished).toBeFalse();

            // start playback until end
            player.wavesurfer().play();
        });
    });

    /** @test {Wavesurfer#onWaveSeek} */
    it('seek', (done) => {

        player.one('waveReady', () => {
            // initially 0
            expect(player.wavesurfer().getCurrentTime()).toEqual(0);

            // seek
            player.wavesurfer().surfer.seekTo(0.5);
            expect(player.wavesurfer().getCurrentTime()).toBeGreaterThan(0);

            done();
        });
    });

    /** @test {Wavesurfer#onPlayToggle} */
    it('toggles play', (done) => {

        player.one('waveReady', () => {
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

    /** @test {Wavesurfer#setupPlaybackEvents} */
    it('setup playback events', (done) => {

        player.one('waveReady', () => {
            player.wavesurfer().setupPlaybackEvents(false);

            done();
        });
    });

    /** @test {Wavesurfer#load} */
    it('loads Blob', (done) => {

        player.one('waveReady', () => {
            // fetch blob version of example audio file
            fetch(TestHelpers.EXAMPLE_AUDIO_FILE).then((response) => {
                return response.blob();
            }).then((blob) => {
                // load blob
                player.one('waveReady', done);
                player.wavesurfer().load(blob);
            });
        });
    });

    /** @test {Wavesurfer#load} */
    it('loads peaks from array', (done) => {

        player.one('waveReady', () => {
            player.wavesurfer().surfer.once('redraw', () => {
                done();
            });
            // load with peaks data
            player.wavesurfer().load(
                TestHelpers.EXAMPLE_AUDIO_FILE,
                [
                    -0.007874015748031496, 0.0, -0.007874015748031496,
                    0.0, -0.007874015748031496, 0.0, -0.007874015748031496,
                    0.0, -0.007874015748031496, 0.0, -0.007874015748031496,
                    0.0, -0.007874015748031496, 0.0, -0.007874015748031496,
                    0.0, -0.007874015748031496, 0.0, -0.007874015748031496
                ]
            );
        });
    });

    /** @test {Wavesurfer#load} */
    it('loads peaks from file', (done) => {

        player.one('waveReady', () => {
            player.wavesurfer().surfer.once('redraw', () => {
                done();
            });
            // load from peaks file
            player.wavesurfer().load(
                TestHelpers.EXAMPLE_AUDIO_FILE,
                TestHelpers.EXAMPLE_AUDIO_PEAKS_FILE
            );
        });
    });

    /** @test {Wavesurfer#load} */
    it('ignores peaks if file cannot be found', (done) => {

        player.one('waveReady', () => {
            player.wavesurfer().surfer.once('redraw', () => {
                done();
            });
            // try loading from non-existing peaks file
            player.wavesurfer().load(
                TestHelpers.EXAMPLE_AUDIO_FILE,
                'broken_file.json'
            );
        });
    });

    /** @test {Wavesurfer#setAudioOutput} */
    it('throws error for non-existing device', (done) => {

        player.one('error', (e) => {
            done();
        });

        player.one('waveReady', () => {
            // set to non-existing device
            player.wavesurfer().setAudioOutput('foo');
        });
    });

});
