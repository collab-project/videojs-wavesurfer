/**
 * @file common.js
 * @since 2.3.0
 */

const path = require('path');
const webpack = require('webpack');
const moment = require('moment');

const time = moment().format('YYYY');
const pckg = require(path.join(__dirname, '..', '..', 'package.json'));

// add banner with copyright and version info
var bannerPlugin = new webpack.BannerPlugin(
`${pckg.name}
@version ${pckg.version}
@see ${pckg.homepage}
@copyright 2014-${time} ${pckg.author}
@license ${pckg.license}`
);

// inject version number
var replaceVersionPlugin = new webpack.DefinePlugin({
  '__VERSION__': JSON.stringify(pckg.version)
});

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
                exclude: /(node_modules|bower_components|test)/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [bannerPlugin, replaceVersionPlugin]
};
