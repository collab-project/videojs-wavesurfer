/**
 * @file middleware.js
 * @since 3.0.0
 */

const myMiddleware = {
    setSource(srcObj, next) {
        let backend = this.player.wavesurfer().surfer.params.backend;
        let src = srcObj.src;
        let peaks = srcObj.peaks;

        switch (backend) {
            case 'WebAudio':
                // load url into wavesurfer
                this.player.wavesurfer().load(src);
                break;

            default:
                // load source into video.js
                next(null, srcObj);

                let element = this.player.tech_.el();
                // load media element into wavesurfer
                if (peaks === undefined) {
                    // regular element
                    this.player.wavesurfer().load(element);
                } else {
                    // load with peaks
                    this.player.wavesurfer().load(element, peaks);
                }
                break;
        }
    }
};

export default myMiddleware;