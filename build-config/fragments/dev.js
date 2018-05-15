/**
 * @file dev.js
 * @since 2.3.0
 */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        contentBase: [path.resolve(__dirname, '..', '..')],
        publicPath: 'localhost:8080/dist/',
        watchContentBase: true
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        })
    ]
};
