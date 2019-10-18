const myMediator = {
    setSource(srcObj, next) {
        // load source into video.js
        next(null, srcObj);

        let backend = player.wavesurfer().surfer.params.backend;
        let src = srcObj.src;
        let peaks = srcObj.peaks;

        switch (backend) {
            case 'MediaElementWebAudio':
            case 'MediaElement':
                let element = player.tech_.el();
                // load media element into wavesurfer
                if (peaks === undefined) {
                    // regular element
                    player.wavesurfer().load(element);
                } else {
                    // load with peaks
                    player.wavesurfer().load(element, peaks);
                }
                break;

            default:
                // load url into wavesurfer
                player.wavesurfer().load(src);
                break;
        }
    },

    callPlay: function() {
        console.log('Play has been called');

        if (player.wavesurfer().surfer.params.backend === "WebAudio") {
            // start surfer playback
            //player.wavesurfer().surfer.play();
            if (player.wavesurfer().surfer.isPlaying()) {
                // show play button
                if (player.controlBar.playToggle !== undefined &&
                    player.controlBar.playToggle.contentEl()) {
                    player.controlBar.playToggle.handlePause();
                }
                player.wavesurfer().surfer.pause();
            } else {
                // show pause button
                if (player.controlBar.playToggle !== undefined &&
                    player.controlBar.playToggle.contentEl()) {
                    player.controlBar.playToggle.handlePlay();
                }
                player.wavesurfer().surfer.play();
            }
            // Terminate by returning the middleware terminator
            return videojs.middleware.TERMINATOR;
        }
    },
    callPause: function() {
        console.log('Pause has been called');

        if (player.wavesurfer().surfer.params.backend === "WebAudio") {
            // Terminate by returning the middleware terminator
            return videojs.middleware.TERMINATOR;
        }
    },
    pause: function(cancelled, value) {
        console.log('pause got back from tech. What is the value passed?', value);

        if (cancelled) {
            console.log('pause has been cancelled prior to this middleware');
        }

        //return value;
    },
    play: function(terminated, value) {
        if (terminated) {
            console.log('The play was middleware terminated.');

            // the value is a play promise
        } else if (value && value.then) {
            value
                .then(() => {
                    console.log('The play call succeeded!')
                })
                .catch(err => {
                    console.log('The play call was rejected', err);
                });
        }
    },
    currentTime: function(ct) {
        return ct / 2;
    },
    setCurrentTime: function(time) {
        return time * 2;
    }
};

export default myMediator;