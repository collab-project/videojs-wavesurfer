/**
 * @file dev.js
 * @since 2.3.0
 */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const contentBase = path.resolve(__dirname, '..', '..');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: [contentBase],
        publicPath: 'localhost:8080/dist/',
        watchContentBase: true,
        watchOptions: {
            ignored: ['.chrome', 'node_modules', 'bower_components',
                'coverage']
        }
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        })
    ]
};
