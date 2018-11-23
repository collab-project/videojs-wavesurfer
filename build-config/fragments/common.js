/**
 * @file common.js
 * @since 2.3.0
 */

const path = require('path');
const webpack = require('webpack');
const moment = require('moment');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const time = moment().format('YYYY');
const rootDir = path.resolve(__dirname, '..', '..');
const pckg = require(path.join(__dirname, '..', '..', 'package.json'));

// add JS banner with copyright and version info
let jsBanner = `${pckg.name}
@version ${pckg.version}
@see ${pckg.homepage}
@copyright 2014-${time} ${pckg.author}
@license ${pckg.license}`;
let jsBannerPlugin = new webpack.BannerPlugin({
    banner: jsBanner,
    test: /\.js$/
});

// add CSS banner with version info
let cssBanner = `/*!
Default styles for ${pckg.name} ${pckg.version}
*/`;
let cssBannerPlugin = new webpack.BannerPlugin({
    banner: cssBanner,
    raw: true,
    test: /\.css$/
});

// inject JS version number
let jsVersionPlugin = new webpack.DefinePlugin({
    '__VERSION__': JSON.stringify(pckg.version)
});

module.exports = {
    context: rootDir,
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
                // javascript
                test: /\.js$/,
                include: path.resolve(rootDir, 'src', 'js'),
                exclude: /(node_modules|bower_components|test)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                // scss
                test: /\.scss$/,
                include: path.resolve(rootDir, 'src', 'css'),
                exclude: /(node_modules|bower_components|test)/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        jsBannerPlugin,
        jsVersionPlugin,
        cssBannerPlugin
    ]
};
