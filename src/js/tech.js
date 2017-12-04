/**
 * @file tech.js
 * @since 2.1.0
 */

const Html5 = videojs.getTech('Html5');

class WavesurferTech extends Html5 {
    /**
     * Create an instance of this Tech.
     *
     * @param {Object} [options]
     *        The key/value store of player options.
     *
     * @param {Component~ReadyCallback} ready
     *        Callback function to call when the `Flash` Tech is ready.
     */
    constructor(options, ready) {
        // never allow for native text tracks, because this isn't actually
        // HTML5 audio. Native tracks fail because we are using wavesurfer
        options.nativeTextTracks = false;

        super(options, ready);

        // we need the player instance so that we can access the current
        // wavesurfer plugin attached to that player
        this.activePlayer = videojs(options.playerId);
        this.waveready = false;

        // track when wavesurfer is fully initialized (ready)
        this.activePlayer.on('waveReady', function() {
            this.waveready = true;
        }.bind(this));

        // proxy timeupdate events so that the tech emits them too. This will
        // allow the rest of videoJS to work (including text tracks)
        this.activePlayer.activeWavesurferPlugin.on('timeupdate', function() {
            this.trigger('timeupdate');
        }.bind(this));
    }

    play() {
        return this.activePlayer.activeWavesurferPlugin.play();
    }

    pause() {
        return this.activePlayer.activeWavesurferPlugin.pause();
    }

    /**
     * Get the current time
     * @return {number}
     */
    currentTime() {
        if (!this.waveready) {
            return 0;
        }

        return this.activePlayer.activeWavesurferPlugin.getCurrentTime();
    }

    /**
     * Get the current duration
     *
     * @return {number}
     *         The duration of the media or 0 if there is no duration.
     */
    duration() {
        if (!this.waveready) {
            return 0;
        }

        return this.activePlayer.activeWavesurferPlugin.getDuration();
    }
}

WavesurferTech.isSupported = function() {
    return true;
};

export default WavesurferTech;
