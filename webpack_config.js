/* eslint-env node */

const path = require('path');

module.exports = {
    entry: {
        wavesurfer: path.resolve(
            __dirname,
            'src', 'js', 'videojs.wavesurfer.js'
        ),
        videojs: path.resolve(
            __dirname,
            'node_modules', 'video.js', 'dist', 'video.js'
        )
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'videojs.wavesurfer.js',
        library: 'Wavesurfer'
    }
};