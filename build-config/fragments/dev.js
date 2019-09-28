/**
 * @file dev.js
 * @since 2.3.0
 */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const contentBase = path.resolve(__dirname, '..', '..');

module.exports = {
    mode: 'development',
    devServer: {
        contentBase: [contentBase],
        publicPath: 'localhost:8080/dist/',
        watchContentBase: true,
        watchOptions: {
            ignored: [
                /.build_cache/,
                /.chrome/,
                /.git/,
                /node_modules/,
                /bower_components/,
                /coverage/,
                /build-config/,
                /test/
            ]
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        })
    ]
};
