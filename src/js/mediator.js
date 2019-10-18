/**
 * @file mediator.js
 * @since 3.0.0
 */

const myMediator = {
    setSource(srcObj, next) {
        let backend = player.wavesurfer().surfer.params.backend;
        let src = srcObj.src;
        let peaks = srcObj.peaks;

        switch (backend) {
            case 'WebAudio':
                // load url into wavesurfer
                player.wavesurfer().load(src);
                break;

            default:
                // load source into video.js
                next(null, srcObj);

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
        }
    }
};

export default myMediator;