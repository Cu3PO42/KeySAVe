/* eslint strict: 0 */
'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.config.base');
const BabelMinifyPlugin = require('babel-minify-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


const config = Object.create(baseConfig);

//config.devtool = 'source-map';

config.entry = './app/index';

config.output.publicPath = './';

config.module.loaders.push({
  test: /^((?!\.module).)*\.css$/,
  loader: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: 'css-loader'
  })
}, {
  test: /\.module\.css$/,
  loader: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
  })
}, {
  test: /^((?!\.module).)*\.scss$/,
  loader: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      'css-loader',
      'sass-loader'
    ]
  })
}, {
  test: /\.module\.scss$/,
  loader: ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
      'sass-loader?sourceMap'
    ]
  })
});

config.plugins.push(
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.DefinePlugin({
    '__DEV__': false,
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new UglifyJSPlugin({
    uglifyOptions: {
      ecma: 8
    }
  }),
  new ExtractTextPlugin({ filename: 'style.css', allChunks: true })
);

config.target = 'web';

module.exports = config;
