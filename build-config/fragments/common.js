/**
 * @file common.js
 * @since 2.3.0
 */

const path = require('path');
const webpack = require('webpack');

const time = new Date();
const pckg = require(path.join(__dirname, '..', '..', 'package.json'));

var bannerPlugin = new webpack.BannerPlugin(
`${pckg.name} ${pckg.version} (${time})
${pckg.homepage}
@license ${pckg.license}`
);

module.exports = {
    context: path.resolve(__dirname, '../', '../'),
    output: {
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    performance: {
        hints: false
    },
    // specify dependencies for the library that are not resolved by webpack,
    // but become dependencies of the output: they are imported from the
    // environment during runtime.
    externals: [
        {'video.js': 'videojs'},
        {'wavesurfer.js': 'WaveSurfer'}
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [bannerPlugin]
};
