/* eslint strict: 0 */
'use strict';

const path = require('path');
const pkg = require('./package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loaders: ['json-loader']
    }, {
      test: /\.png$/,
      loaders: ['file-loader']
    }]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    mainFields: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
    alias: {
      handlebars: 'handlebars/dist/handlebars.min.js'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './app/index.ejs'
    })
  ]
};
