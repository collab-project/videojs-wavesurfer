/**
 * @file videojs.wavesurfer.js
 *
 * The main file for the videojs-wavesurfer project.
 * License: https://github.com/collab-project/videojs-wavesurfer/blob/master/LICENSE
 */

import videojs from 'video.js';

const Plugin = videojs.getPlugin('plugin');

class Advanced extends Plugin {

    constructor(player, options) {
        super(player, options);

        // Whenever the player emits a playing or paused event, we update the
        // state if necessary.
        this.on('statechanged', this.logState);
        this.on(player, ['playing', 'paused'], this.updateState);
    }

    dispose() {
        super.dispose();
        videojs.log('the advanced plugin is being disposed');
    }

    updateState() {
        this.setState({playing: !this.paused()});
    }

    logState(changed) {
        videojs.log(`the player is now ${this.state.playing ? 'playing' : 'paused'}`);
    }
}

/*videojs.Advanced = Advanced;
if (!videojs.use) {
    videojs.registerComponent('Advanced', Advanced);
}*/

if (videojs.registerPlugin) {
    videojs.registerPlugin('wavesurfer', Advanced);
} else {
    videojs.plugin('wavesurfer', Advanced);
}

module.exports = {
    Advanced
};
