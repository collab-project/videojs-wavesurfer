/**
 * @since 2.5.0
 */

import Event from '../src/js/event.js';

import TestHelpers from './test-helpers.js';

/** @test {Wavesurfer} */
describe('Wavesurfer TextTracks', () => {
    let player;

    beforeEach(() => {
        // create audio element with nested text track element
        const element = TestHelpers.makeElement('audio', 'myAudioTextTracks');
        const track = document.createElement('track');
        track.kind = 'captions';
        track.src = TestHelpers.EXAMPLE_VTT_FILE;
        track.srclang = 'en-US';
        track.default = true;
        element.appendChild(track);

        // create new player
        player = TestHelpers.makePlayer({}, element);
    });

    afterEach(() => {
        // delete player
        player.dispose();
    });

    /** @test {Wavesurfer} */
    it('displays interface elements', (done) => {

        player.one(Event.WAVE_READY, () => {
            // text tracks UI is visible
            expect(player.controlBar.subsCapsButton.hasClass('vjs-hidden')).toBeFalse();

            // text track is present
            expect(player.textTracks().length).toEqual(1);

            done();
        });

        player.src(TestHelpers.EXAMPLE_AUDIO_SRC);
    });
});