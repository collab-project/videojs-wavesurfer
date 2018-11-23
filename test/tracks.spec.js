/**
 * @since 2.5.0
 */

import TestHelpers from './test-helpers.js';


/** @test {Wavesurfer} */
describe('Wavesurfer TextTracks', () => {
    let player;

    beforeEach(() => {
        // create audio element with nested text track element
        const tag = TestHelpers.makeTag('audio', 'myAudioTextTracks');
        const track = document.createElement('track');
        track.kind = 'captions';
        track.src = TestHelpers.EXAMPLE_VTT_FILE;
        track.srclang = 'en-US';
        track.default = true;
        tag.appendChild(track);

        // create new player
        player = TestHelpers.makePlayer({}, tag);
    });

    afterEach(() => {
        // delete player
        player.dispose();
    });

    /** @test {Wavesurfer} */
    it('displays interface elements', (done) => {

        player.one('waveReady', () => {
            // text tracks UI is visible
            expect(player.controlBar.subsCapsButton.hasClass('vjs-hidden')).toBeFalse();

            // text track is present
            expect(player.textTracks().length).toEqual(1);

            done();
        });
    });
});