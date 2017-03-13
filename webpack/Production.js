const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');

var path = require('path'),
    webpack = require('webpack'),
    fileNameConvention = '[name].[ext]',
    publicPathForAssets = 'assets/',
    outputPathForAssets = 'assets/',
    ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function (env) {
    return webpackMerge(commonConfig(), {
        entry: {
            app: ['bootstrap-loader',  './app/index.ts'],
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.scss$/, use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: ['css', 'sass']
                    })
                },
                { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: [{ loader: 'url', options: { limit: 32000, name: fileNameConvention, publicPath: publicPathForAssets, outputPath: outputPathForAssets } }] }, // IE8 only supports 32k url base64 media
                { test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: [{ loader: 'url', options: { limit: 32000, name: fileNameConvention, publicPath: publicPathForAssets, outputPath: outputPathForAssets } }] },
                { test: /.(gif|jpe?g|png|bmp|svg)$/, use: [{ loader: 'url', options: { limit: 32000, name: fileNameConvention, publicPath: publicPathForAssets, outputPath: outputPathForAssets } }] }
            ]
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({sourceMap: true, compress: { warnings: false}}),
            new ExtractTextPlugin('style.css'),
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('Production')
                }
            })
        ]
    })
}