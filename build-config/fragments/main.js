/**
 * @file main.js
 * @since 2.3.0
 */

const path = require('path');

module.exports = {
    entry: {
        'videojs.wavesurfer': path.resolve(
            __dirname,
            '../', '../', 'src', 'js', 'videojs.wavesurfer.js'
        )
    },
    output: {
        path: path.resolve(__dirname, '../', '../', 'dist'),
        filename: '[name].js',
        library: 'VideojsWavesurfer'
    }
};
