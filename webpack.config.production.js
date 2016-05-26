/* eslint strict: 0 */
'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.config.base');


const config = Object.create(baseConfig);

config.devtool = 'source-map';

config.entry = './app/index';

config.output.publicPath = '../dist/';

config.module.loaders.push({
  test: /^((?!\.module).)*\.css$/,
  loader: ExtractTextPlugin.extract(
    'style-loader',
    'css-loader'
  )
}, {
  test: /\.module\.css$/,
  loader: ExtractTextPlugin.extract(
    'style-loader',
    'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
  )
}, {
  test: /^((?!\.module).)*\.scss$/,
  loader: ExtractTextPlugin.extract(
    'style-loader',
    [
      'css-loader',
      'sass-loader'
    ]
  )
}, {
  test: /\.module\.scss$/,
  loader: ExtractTextPlugin.extract(
    'style-loader',
    [
      'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
      'sass-loader?sourceMap'
    ]
  )
});

config.plugins.push(
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.DefinePlugin({
    '__DEV__': false,
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  /*new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true,
      warnings: false
    }
  }),*/
  new ExtractTextPlugin('style.css', { allChunks: true })
);

config.target = 'electron-renderer';

module.exports = config;
