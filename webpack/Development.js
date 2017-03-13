const webpackMerge = require('webpack-merge'),
    commonConfig = require('./base.js'),
    path = require('path'),
    webpack = require('webpack');

module.exports = function (env) {
    return webpackMerge(commonConfig(), {
        entry: {
            app: ['bootstrap-loader',  './app/index.development.ts'],
        },
        devtool: 'eval-source-map',
        module: {
            rules: [
                { test: /\.scss$/, use: ['style-loader', 'css', 'sass'] },
                { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: [{ loader: 'url', options: { limit: 1000000 } }] },
                { test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: [{ loader: 'url', options: { limit: 1000000 } }] },
                { test: /.(gif|jpe?g|png|bmp|svg)$/, use: [{ loader: 'url', options: { limit: 1000000 } }] }
            ]
        },
        devServer: {
            outputPath: path.join(__dirname, ".tmp")
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify('Development')
                }
            })
        ]
    })
}