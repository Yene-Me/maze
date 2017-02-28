var LiveReloadPlugin = require('webpack-livereload-plugin');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  
    entry: {
        'app': './app/index.js'
    },
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
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('src', 'app'),
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap')
            },
            {
                test: /\.css$/,
                include: helpers.root('src', 'app'),
                loader: 'raw'
            },
            {
                test: /.less$/,
                exclude: /node_modules/,
                loader: 'raw-loader!less-loader'
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: 'src/img', to: 'img', force: true}
        ]),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ],
    devtool : 'cheap-source-map'
};