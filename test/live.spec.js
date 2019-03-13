/**
 * @since 2.3.0
 */

import Event from '../src/js/event.js';

import TestHelpers from './test-helpers.js';

/** @test {Wavesurfer} */
describe('Wavesurfer Live', () => {
    let player;

    afterEach(() => {
        // delete player
        player.dispose();
    });

    /** @test {Wavesurfer} */
    it('throws error when microphone plugin is missing', () => {
        let plugin = WaveSurfer.microphone;
        WaveSurfer.microphone = undefined;

        player = TestHelpers.makeLivePlayer();

        WaveSurfer.microphone = plugin;
    });

});