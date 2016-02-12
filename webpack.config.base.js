/* eslint strict: 0 */
'use strict';

const path = require('path');

module.exports = {
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
  }, {
      test: /\.tsx?$/,
      loaders: ['babel-loader', 'ts-loader'],
      exclude: /node_modules/
  }]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.ts', '.tsx'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  plugins: [

  ],
  externals: [
      "keysavcore",
      "chokidar"
    // put your node 3rd party libraries which can't be built with webpack here (mysql, mongodb, and so on..)
  ]
};
