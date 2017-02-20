var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    entry: './app/index.js',
    output: {
        filename: 'bundle.js',
        path: __dirname
    },
    plugins: [
        new LiveReloadPlugin()
    ],
    module: {
        loaders: [
            {
                test: /.js/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    devtool : 'cheap-source-map'
};