/**
 * @file main.js
 * @since 2.3.0
 */

const path = require('path');
const rootDir = path.resolve(__dirname, '..', '..');
const sourceDir = path.join(rootDir, 'src');

module.exports = {
    entry: {
        code: {
            import: path.join(sourceDir, 'js', 'videojs.wavesurfer.js'),
            filename: 'videojs.wavesurfer.js'
        },
        style: {
            import: path.join(sourceDir, 'css', 'videojs.wavesurfer.scss')
        }
    },
    output: {
        path: path.join(rootDir, 'dist'),
        library: 'VideojsWavesurfer'
    }
};
