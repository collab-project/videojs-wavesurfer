/**
 * @file common.js
 * @since 2.3.0
 */

const path = require('path');
const webpack = require('webpack');
const datefns = require('date-fns');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const date = datefns.format(new Date(), 'yyyy');
const rootDir = path.resolve(__dirname, '..', '..');
const pckg = require(path.join(__dirname, '..', '..', 'package.json'));

process.traceDeprecation = true;

// add JS banner with copyright and version info
let jsBanner = `${pckg.name}
@version ${pckg.version}
@see ${pckg.homepage}
@copyright 2014-${date} ${pckg.author}
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
    devtool: false,
    context: rootDir,
    output: {
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    performance: {
        hints: false
    },
    stats: {
        colors: true
    },
    // specify dependencies for the library that are not resolved by webpack,
    // but become dependencies of the output: they are imported from the
    // environment during runtime and never directly included in the
    // videojs-wavesurfer library
    externals: {
        'video.js': {
            commonjs: 'video.js',
            commonjs2: 'video.js',
            amd: 'video.js',
            root: 'videojs' // indicates global variable
        },
        'wavesurfer.js': {
            commonjs: 'wavesurfer.js',
            commonjs2: 'wavesurfer.js',
            amd: 'wavesurfer.js',
            root: 'WaveSurfer' // indicates global variable
        }
    },
    module: {
        rules: [
            {
                // javascript
                test: /\.js$/,
                include: path.resolve(rootDir, 'src', 'js'),
                exclude: /(node_modules|bower_components|test)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        comments: false
                    }
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
