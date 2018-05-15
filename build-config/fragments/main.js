/**
 * @file main.js
 * @since 2.3.0
 */

const path = require('path');
const sourceDir = path.resolve(__dirname, '..', '..', 'src');

module.exports = {
    entry: {
        'videojs.wavesurfer': [
            // JS
            path.resolve(sourceDir, 'js', 'videojs.wavesurfer.js'),
            // SCSS
            path.resolve(sourceDir, 'css', 'videojs.wavesurfer.scss')
        ]
    },
    output: {
        path: path.resolve(__dirname, '..', '..', 'dist'),
        filename: '[name].js',
        library: 'VideojsWavesurfer'
    }
};
