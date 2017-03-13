const path = require('path'),
    webpack = require('webpack');

module.exports = () => {
    return {
        entry: {
            boot: ['core-js', 'whatwg-fetch']
        },
        output: {
            filename: 'dummy-elektron.js',
            path: path.join(__dirname, "../.tmp/templates/elektron"),
            library: ['elektron']
        },
        externals: {
            jquery: 'jQuery',
            lodash: '_',
            knockout: 'ko',
            'sp-pnp-js': 'window.$pnp',
            loglevel: 'log'
        },
        context: path.join(__dirname, "../src"),
        resolve: {
            extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.jsx']
        },
        module: {
            rules: [
                { test: /\.tsx?$/, use: ['tslint'], enforce: 'pre' },
                { test: /\.tsx?$/, use: ['ts'] },
                { test: /\.html$/, use: ['html'] },
                { test: /\.js$/, use: ['source-map'], enforce: 'pre', exclude: /config.js$/ },
            ],
        },
        plugins: [
            new webpack.ProvidePlugin({ jQuery: 'jquery', $: 'jquery', jquery: 'jquery' }),
            new webpack.optimize.CommonsChunkPlugin({ name: 'boot', filename: 'dummy-elektron.boot.js' })
        ],
        resolveLoader: {
            moduleExtensions: ["-loader"]
        }
    }
}