/**
 * React example.
 */

class VideojsWavesurferPlayer extends React.Component {
    componentDidMount() {
        // instantiate Video.js
        this.player = videojs(this.videoNode, this.props, function onPlayerReady(){
            // print version information at startup
            videojs.log('Using video.js', videojs.VERSION,
                'with videojs-wavesurfer', videojs.getPluginVersion('wavesurfer'));
        });

        // error handling
        this.player.on('error', function(error) {
            console.warn(error);
        });
    }

    // destroy player on unmount
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    }

    // wrap the player in a div with a `data-vjs-player` attribute
    // so videojs won't create additional wrapper in the DOM
    // see https://github.com/videojs/video.js/pull/3856
    render() {
        return (
            <div data-vjs-player>
                <audio id="myAudio" ref={ node => this.videoNode = node } className="video-js"></audio>
            </div>
        )
    }
}

const videoJsOptions = {
    controls: true,
    autoplay: false,
    fluid: false,
    width: 600,
    height: 300,
    plugins: {
        wavesurfer: {
            src: '../media/hal.wav',
            msDisplayMax: 10,
            debug: true,
            waveColor: 'white',
            progressColor: 'black',
            cursorColor: 'black',
            hideScrollbar: true
        }
    }
};

ReactDOM.render(<VideojsWavesurferPlayer { ...videoJsOptions } />, document.getElementById('root'));
