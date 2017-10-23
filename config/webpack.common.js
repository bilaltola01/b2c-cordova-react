const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const helpers = require('./helpers');

module.exports = {
    entry: [
        'webpack/hot/dev-server',
        'webpack-hot-middleware/client',
        './www/main.jsx'
    ],

    resolve: {
        extensions: ['.js', '.jsx']
    },

    module: {
        loaders: [
            {
                test: /\.jsx$/,
                //exclude: helpers.root('v1', 'node_modules'),
                exclude: ['/node_modules/'],
                loaders: [
                    'react-hot-loader',
                    'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-2'
                ]
            },
            {
                test: /\.js$/,
                exclude: ['/node_modules/'],
                loaders: [
                    'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-2'
                ]
            },
            /*
            {
                test: /\.html$/,
                loader: 'html'
            },*/
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=/www/assets/fonts/[name].[hash].[ext]'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('www', 'app'),
                //loader: ExtractTextPlugin.extract({ fallback: 'style', use: 'css-loader?sourceMap' })
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader?sourceMap'
                })
            },
            {
                test: /\.css$/,
                include: helpers.root('www', 'app'),
                loader: 'raw-loader'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ['raw-loader', 'sass-loader?sourceMap']
            }
        ]
    },

    plugins: [
    /*
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app']
        }),
*/
/*
        new HtmlWebpackPlugin({
            template: 'public/index.html'
        })*/
    ]
};