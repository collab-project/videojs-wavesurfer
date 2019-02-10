/**
 * @file main.js
 * @since 2.3.0
 */

const path = require('path');
const rootDir = path.resolve(__dirname, '..', '..');
const sourceDir = path.join(rootDir, 'src');

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
        path: path.join(rootDir, 'dist'),
        filename: '[name].js',
        library: 'VideojsWavesurfer'
    }
};
