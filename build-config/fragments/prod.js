/**
 * @file prod.js
 * @since 2.3.0
 */

const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                sourceMap: false,
                parallel: true,
                extractComments: false,
                terserOptions: {
                    output: {
                        // preserve license comments
                        comments: /@license/i
                    }
                }
            })
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].min.css'
        })
    ]
};
