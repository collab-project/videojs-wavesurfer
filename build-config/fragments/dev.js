/**
 * @file dev.js
 * @since 2.3.0
 */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

const contentBase = path.resolve(__dirname, '..', '..');

module.exports = {
    mode: 'development',
    devServer: {
        port: 8080,
        static: [
            {
                directory: contentBase,
                staticOptions: {},
                publicPath: '/',
                serveIndex: true,
                watch: {
                    ignored: [
                        /.build_cache/,
                        /.chrome/,
                        /docs/,
                        /node_modules/,
                        /bower_components/,
                        /coverage/,
                        /build-config/,
                        /test/,
                        /vendor/
                    ]
                }
            }
        ]
    },
    plugins: [
        new RemoveEmptyScriptsPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/videojs.wavesurfer.css',
            chunkFilename: 'css/[id].css'
        })
    ]
};
