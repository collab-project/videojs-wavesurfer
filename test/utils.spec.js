import formatTime from '../src/js/utils/format-time.js';

import Wavesurfer from '../src/js/videojs.wavesurfer.js';

/** @test {format-time} */
describe('format-time:', function() {

    /** @test {formatTime} */
    it('formatTime returns a string', function() {
        let time = formatTime();

        expect(time).toEqual('-:-');
    });
});
