/**
 * @since 2.3.0
 */

import TestHelpers from './test-helpers.js';

import Event from '../src/js/event.js';

// registers the plugin (once)
import Wavesurfer from '../src/js/videojs.wavesurfer.js';

/** @test {Wavesurfer} */
describe('Wavesurfer', () => {
    let player;

    beforeEach(() => {
        // create new player
        player = TestHelpers.makePlayer();
    });

    afterEach(() => {
        try {
            player.dispose();
        } catch (err) {}
    });

    /** @test {Wavesurfer} */
    it('is an advanced plugin instance', (done) => {

        player.one(Event.READY, () => {
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

        player.one(Event.WAVE_READY, () => {
            player.one(Event.PLAYBACK_FINISH, done);
            // start playback
            player.wavesurfer().play();
        });

        player.src(TestHelpers.EXAMPLE_AUDIO_SRC);
    });

    /** @test {Wavesurfer#pause} */
    it('pauses playback', (done) => {

        player.one(Event.WAVE_READY, () => {
            // start playback
            player.wavesurfer().play();

            // pause
            player.wavesurfer().pause();
            expect(player.paused()).toBeTrue();

            done();
        });

        player.src(TestHelpers.EXAMPLE_AUDIO_SRC);
    });

    /** @test {Wavesurfer#onWaveSeek} */
    it('seek', (done) => {

        player.one(Event.WAVE_READY, () => {
            // initially 0
            expect(player.wavesurfer().getCurrentTime()).toEqual(0);

            // seek
            player.wavesurfer().surfer.seekTo(0.5);
            expect(player.wavesurfer().getCurrentTime()).toBeGreaterThan(0);

            done();
        });

        player.src(TestHelpers.EXAMPLE_AUDIO_SRC);
    });

    /** @test {Wavesurfer#destroy} */
    it('destroys player', (done) => {

        player.one(Event.WAVE_READY, () => {
            expect(player.wavesurfer().isDestroyed()).toBeFalse();

            // kill it
            player.wavesurfer().destroy();

            expect(player.wavesurfer().isDestroyed()).toBeTrue();

            done();
        });

        player.src(TestHelpers.EXAMPLE_AUDIO_SRC);
    });

    /** @test {Wavesurfer#getCurrentTime} */
    it('get current time', (done) => {

        player.one(Event.PLAYBACK_FINISH, () => {
            expect(player.wavesurfer().getCurrentTime()).toBeNear(
                TestHelpers.EXAMPLE_AUDIO_DURATION, 0.01);
            done();
        });

        player.one(Event.WAVE_READY, () => {
            // initially 0
            expect(player.wavesurfer().getCurrentTime()).toEqual(0);

            // start playback until end
            player.wavesurfer().play();
        });

        player.src(TestHelpers.EXAMPLE_AUDIO_SRC);
    });

    /** @test {Wavesurfer#setCurrentTime} */
    it('set current time', (done) => {

        player.one(Event.WAVE_READY, () => {

            expect(player.wavesurfer().getCurrentTime()).toEqual(0);
            player.wavesurfer().setCurrentTime(0.123);

            // only updates player visually
            expect(player.controlBar.currentTimeDisplay.formattedTime_).toEqual('00:00:123');

            // invalid values result in 0
            player.wavesurfer().setCurrentTime('foo', 'bar');
            expect(player.controlBar.currentTimeDisplay.formattedTime_).toEqual('00:00:000');

            done();
        });

        player.src(TestHelpers.EXAMPLE_AUDIO_SRC);
    });

    /** @test {Wavesurfer#getDuration} */
    it('get duration', (done) => {

        player.one(Event.WAVE_READY, () => {

            expect(player.wavesurfer().getDuration()).toBeNear(
                TestHelpers.EXAMPLE_AUDIO_DURATION, 0.01);

            done();
        });

        player.src(TestHelpers.EXAMPLE_AUDIO_SRC);
    });

    /** @test {Wavesurfer#setDuration} */
    it('set duration', (done) => {

        player.one(Event.WAVE_READY, () => {

            expect(player.wavesurfer().getDuration()).toBeNear(
                TestHelpers.EXAMPLE_AUDIO_DURATION, 0.01);
            player.wavesurfer().setDuration(0.1);

            // only updates player visually
            expect(player.controlBar.durationDisplay.formattedTime_).toEqual('00:00:100');

            // invalid values result in 0
            player.wavesurfer().setDuration('foo');
            expect(player.controlBar.durationDisplay.formattedTime_).toEqual('00:00:000');

            done();
        });

        player.src(TestHelpers.EXAMPLE_AUDIO_SRC);
    });

    /** @test {Wavesurfer#setVolume} */
    it('set volume', (done) => {

        player.one(Event.WAVE_READY, () => {

            player.wavesurfer().setVolume(0);
            expect(player.volume()).toEqual(0);

            // invalid values are ignored
            player.wavesurfer().setVolume();
            expect(player.volume()).toEqual(0);

            player.wavesurfer().setVolume(0.1);
            expect(player.volume()).toEqual(0.1);

            done();
        });

        player.src(TestHelpers.EXAMPLE_AUDIO_SRC);
    });

    /** @test {Wavesurfer#exportImage} */
    it('exports image', (done) => {

        player.one(Event.WAVE_READY, () => {
            let data = player.wavesurfer().exportImage('image/png', 1, 'dataURL');
            expect(data).toStartWith('data:image/png;base64,');

            // webp
            data = player.wavesurfer().exportImage('image/webp', 1, 'dataURL');
            expect(data).toStartWith('data:image');

            // jpeg
            data = player.wavesurfer().exportImage('image/jpeg', 1, 'dataURL');
            expect(data).toStartWith('data:image/jpeg;base64,');

            // default to png
            player.wavesurfer().exportImage().then((arrayOfBlob) => {
                // received a blob
                expect(arrayOfBlob instanceof Array).toBeTruthy();
                expect(arrayOfBlob[0] instanceof Blob).toBeTruthy();
                expect(arrayOfBlob[0].type).toEqual('image/png');

                done();
            });
        });

        player.src(TestHelpers.EXAMPLE_AUDIO_SRC);
    });

    /** @test {Wavesurfer#onWaveReady} */
    it('fires waveReady event', (done) => {

        player.one(Event.WAVE_READY, () => {
            expect(player.wavesurfer().waveReady).toBeTrue();
            expect(player.wavesurfer().waveFinished).toBeFalse();
            expect(player.wavesurfer().liveMode).toBeFalse();

            done();
        });

        player.src(TestHelpers.EXAMPLE_AUDIO_SRC);
    });

    /** @test {Wavesurfer#onWaveFinish} */
    it('fires playbackFinish event', (done) => {

        player.one(Event.PLAYBACK_FINISH, done);
        player.one(Event.WAVE_READY, () => {
            expect(player.wavesurfer().waveFinished).toBeFalse();

            // start playback until end
            player.wavesurfer().play();
        });

        player.src(TestHelpers.EXAMPLE_AUDIO_SRC);
    });

    /** @test {Wavesurfer#setupPlaybackEvents} */
    it('setup playback events', (done) => {

        player.one(Event.WAVE_READY, () => {
            player.wavesurfer().setupPlaybackEvents(false);

            done();
        });

        player.src(TestHelpers.EXAMPLE_AUDIO_SRC);
    });

    /** @test {Wavesurfer#setAudioOutput} */
    it('throws error for non-existing device', (done) => {

        player.one(Event.ERROR, done);

        player.one(Event.WAVE_READY, () => {
            // set to non-existing device
            player.wavesurfer().setAudioOutput('foo');
        });

        player.src(TestHelpers.EXAMPLE_AUDIO_SRC);
    });

    /** @test {Wavesurfer#load}
    it('loads Blob', (done) => {
        // XXX: should throw error with MediaElement backend
        done();

        player.one(Event.READY, () => {
            // fetch blob version of example audio file
            fetch(TestHelpers.EXAMPLE_AUDIO_FILE).then((response) => {
                return response.blob();
            }).then((blob) => {
                // load blob
                player.one(Event.WAVE_READY, done);
                player.wavesurfer().load(blob);
            });
        });
    });
    */

    /** @test {Wavesurfer#load} */
    it('loads peaks from array', (done) => {

        player.one(Event.WAVE_READY, done);

        player.src({
            src: TestHelpers.EXAMPLE_AUDIO_FILE,
            type: TestHelpers.EXAMPLE_AUDIO_TYPE,
            peaks: [
                -0.007874015748031496, 0.0, -0.007874015748031496,
                0.0, -0.007874015748031496, 0.0, -0.007874015748031496,
                0.0, -0.007874015748031496, 0.0, -0.007874015748031496,
                0.0, -0.007874015748031496, 0.0, -0.007874015748031496,
                0.0, -0.007874015748031496, 0.0, -0.007874015748031496
            ]
        });
    });

    /** @test {Wavesurfer#load} */
    it('loads peaks from JSON file', (done) => {

        player.one(Event.WAVE_READY, done);

        player.src({
            src: TestHelpers.EXAMPLE_AUDIO_FILE,
            type: TestHelpers.EXAMPLE_AUDIO_TYPE,
            peaks: TestHelpers.EXAMPLE_AUDIO_PEAKS_FILE
        });
    });

    /** @test {Wavesurfer#load} */
    it('throws error if peaks file cannot be found', (done) => {

        player.one(Event.ERROR, (element, err) => {
            expect(err).toStartWith('Unable to retrieve peak data from non_existing_file.json.');
            expect(err).toEndWith('Status code: 404');
            done();
        });

        // try loading from non-existing peaks file
        player.src({
            src: TestHelpers.EXAMPLE_AUDIO_FILE,
            type: TestHelpers.EXAMPLE_AUDIO_TYPE,
            peaks: 'non_existing_file.json'
        });
    });

    /** @test {Wavesurfer#load} */
    it('throws error if peaks data property cannot be found in JSON file', (done) => {
        player.one(Event.ERROR, (element, err) => {
            expect(err).toStartWith('Could not load peaks data from ');
            expect(err).toEndWith('demo-peaks-invalid.json');
            done();
        });

        // try loading from peaks file without a data property
        player.src({
            src: TestHelpers.EXAMPLE_AUDIO_FILE,
            type: TestHelpers.EXAMPLE_AUDIO_TYPE,
            peaks: TestHelpers.EXAMPLE_AUDIO_PEAKS_INVALID_FILE
        });
    });
});
