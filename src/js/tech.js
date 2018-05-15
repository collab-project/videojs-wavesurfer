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
    }

    setActivePlayer(player) {
        // we need the player instance so that we can access the current
        // wavesurfer plugin attached to that player
        this.activePlayer = player;
        this.waveready = false;

        // track when wavesurfer is fully initialized (ready)
        this.activePlayer.on('waveReady', () => {
            this.waveready = true;
        });

        if (!this.playerIsUsingWavesurfer()) {
            // the plugin hasn't been initialized for this player, so it
            // likely doesn't need our html5 tech modifications
            return;
        }

        // proxy timeupdate events so that the tech emits them too. This will
        // allow the rest of videoJS to work (including text tracks)
        this.activePlayer.activeWavesurferPlugin.on('timeupdate', () => {
            this.trigger('timeupdate');
        });
    }

    /**
     * Determine whether or not the player is trying use the wavesurfer plugin
     * @returns {boolean}
     */
    playerIsUsingWavesurfer()
    {
        let availablePlugins = videojs.getPlugins();
        let usingWavesurferPlugin = 'wavesurfer' in availablePlugins;
        let usingRecordPlugin = 'record' in availablePlugins;

        return usingWavesurferPlugin && !usingRecordPlugin;
    }

    /**
     * Start playback.
     */
    play() {
        if (!this.playerIsUsingWavesurfer()) {
            // fall back to html5 tech functionality
            return super.play();
        }

        return this.activePlayer.activeWavesurferPlugin.play();
    }

    /**
     * Pause playback.
     */
    pause() {
        if (!this.playerIsUsingWavesurfer()) {
            //fall back to html5 tech functionality
            return super.pause();
        }

        return this.activePlayer.activeWavesurferPlugin.pause();
    }

    /**
     * Get the current time
     * @return {number}
     */
    currentTime() {
        if (!this.playerIsUsingWavesurfer()) {
            // fall back to html5 tech functionality
            return super.currentTime();
        }

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
        if (!this.playerIsUsingWavesurfer()) {
            // fall back to html5 tech functionality
            return super.duration();
        }

        if (!this.waveready) {
            return 0;
        }

        return this.activePlayer.activeWavesurferPlugin.getDuration();
    }

    /**
     * Set the current time
     *
     * @since 2.1.1
     * @param {number} time
     * @returns {*}
     */
    setCurrentTime(time) {
        if (!this.playerIsUsingWavesurfer()) {
            // fall back to html5 tech functionality
            return super.currentTime(time);
        }

        if (!this.waveready) {
            return 0;
        }

        return this.activePlayer.activeWavesurferPlugin.surfer.seekTo(
            time / this.activePlayer.activeWavesurferPlugin.surfer.getDuration());
    }

    /**
     * Sets the current playback rate. A playback rate of
     * 1.0 represents normal speed and 0.5 would indicate half-speed
     * playback, for instance.
     *
     * @since 2.1.1
     * @param {number} [rate]
     *       New playback rate to set.
     *
     * @return {number}
     *         The current playback rate when getting or 1.0
     */
    setPlaybackRate(rate) {
        if (this.playerIsUsingWavesurfer()) {
            this.activePlayer.activeWavesurferPlugin.surfer.setPlaybackRate(rate);
        }

        return super.setPlaybackRate(rate);
    }
}

WavesurferTech.isSupported = function() {
    return true;
};

export default WavesurferTech;
