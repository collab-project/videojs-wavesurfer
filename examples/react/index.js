/**
 * React example.
 */

class VideojsWavesurferPlayer extends React.Component {
    componentDidMount() {
        // instantiate Video.js
        this.player = videojs(this.audioNode, this.props, () => {
            // print version information at startup
            var version_info = 'Using video.js ' + videojs.VERSION +
                ' with videojs-wavesurfer ' + videojs.getPluginVersion('wavesurfer') +
                ' and wavesurfer.js ' + WaveSurfer.VERSION;
            videojs.log(version_info);

            // load file
            this.player.src({src: '../media/hal.wav', type: 'audio/wav'});
        });

        this.player.on('waveReady', (event) => {
            console.log('waveform: ready!');
        });

        this.player.on('playbackFinish', (event) => {
            console.log('playback finished.');
        });

        // error handling
        this.player.on('error', (element, error) => {
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
                <audio id="myAudio" ref={ node => this.audioNode = node } className="video-js vjs-default-skin"></audio>
            </div>
        )
    }
}

const videoJsOptions = {
    controls: true,
    autoplay: false,
    loop: false,
    muted: false,
    fluid: false,
    width: 600,
    height: 300,
    bigPlayButton: false,
    plugins: {
        wavesurfer: {
            backend: 'MediaElement',
            displayMilliseconds: true,
            debug: true,
            waveColor: 'white',
            progressColor: 'black',
            cursorColor: 'black',
            hideScrollbar: true
        }
    }
};

ReactDOM.render(<VideojsWavesurferPlayer { ...videoJsOptions } />, document.getElementById('root'));
