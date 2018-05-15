/**
 * @file common.js
 * @since 2.3.0
 */

const path = require('path');
const webpack = require('webpack');
const moment = require('moment');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

const time = moment().format('YYYY');
const pckg = require(path.join(__dirname, '..', '..', 'package.json'));

// add banner with copyright and version info
var banner = `${pckg.name}
@version ${pckg.version}
@see ${pckg.homepage}
@copyright 2014-${time} ${pckg.author}
@license ${pckg.license}`;
var bannerPlugin = new webpack.BannerPlugin({
    banner: banner,
    test: /\.js$/
});
// inject version number
var replaceVersionPlugin = new webpack.DefinePlugin({
  '__VERSION__': JSON.stringify(pckg.version)
});
var cssVersionPlugin = new ReplaceInFileWebpackPlugin([{
    dir: 'dist/css',
    test: [/\.css$/],
    rules: [{
        search: /LIB_VERSION/ig,
        replace: pckg.version
    }]
}]);
var rootDir = path.resolve(__dirname, '..', '..');

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
                test: /\.js$/,
                include: path.resolve(rootDir, 'src', 'js'),
                exclude: /(node_modules|bower_components|test)/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.scss$/,
                include: path.resolve(rootDir, 'src', 'css'),
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        bannerPlugin,
        replaceVersionPlugin,
        cssVersionPlugin
    ]
};
