/**
 * @since 2.3.0
 */

import Event from '../src/js/event.js';

import TestHelpers from './test-helpers.js';

import MicrophonePlugin from 'wavesurfer.js/dist/plugin/wavesurfer.microphone';

/** @test {Wavesurfer} */
describe('Wavesurfer Live', () => {
    let player;

    afterEach(() => {
        // delete player
        player.dispose();
    });

    /** @test {Wavesurfer} */
    it('microphone plugin is enabled', (done) => {
        player = TestHelpers.makePlayer({
            plugins: {
                wavesurfer: {
                    backend: 'WebAudio',
                    waveColor: 'black',
                    cursorWidth: 0,
                    interact: false,
                    plugins: [
                        // enable microphone plugin (for wavesurfer.js)
                        MicrophonePlugin.create({
                            bufferSize: 4096,
                            numberOfInputChannels: 1,
                            numberOfOutputChannels: 1,
                            constraints: {
                                video: false,
                                audio: true
                            }
                        })
                    ]
                }
            }
        });

        player.one(Event.READY, () => {
            expect(player.wavesurfer().liveMode).toBeTrue();
            expect(player.wavesurfer().waveReady).toBeTrue();
            expect(player.wavesurfer().surfer.microphone).toBeDefined();

            player.wavesurfer().surfer.microphone.once('deviceReady', () => {
                // device is ready
                expect(player.wavesurfer().surfer.microphone.active).toBeTrue();

                // increase test coverage
                player.wavesurfer().pause();
                player.wavesurfer().play();

                done();
            });

            // start microphone
            player.wavesurfer().play();
        });
    });

});