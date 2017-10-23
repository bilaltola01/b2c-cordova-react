const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonConfig = require('./webpack.common');
const helpers = require('./helpers');

const PORT = process.env.PORT || 8081;

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: helpers.root('www'),//helpers.root('dist'),
        publicPath: //'https://one-menu-b2b.herokuapp.com:' + PORT + '/',
        '/',
        filename: '[name]-bundle.js',//[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new ExtractTextPlugin({
            filename: '[name].css'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});