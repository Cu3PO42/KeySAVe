/* eslint strict: 0 */
'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const { NODE_ENV } = process.env;
if (NODE_ENV !== 'production' && NODE_ENV !== 'development') {
  throw new Error('Must set NODE_ENV to either production or development.');
}

const IS_PROD = process.env['NODE_ENV'] === 'production';

const cssLoaders = (other, modules) => ExtractTextPlugin.extract({
  use: [{
    loader: 'css-loader',
    options: {
      sourceMap: true,
      // Enable CSS Modules to scope class names
      modules,
      minimize: IS_PROD,
      importLoaders: 1 + other.length
    }
  }, {
    // Adjust URLs in CSS files so that they are relative to the source file rather than the output file
    loader: 'resolve-url-loader'
  }, ...other],
  // Do not extract in development mode for hot reloading
  fallback: 'style-loader'
});

module.exports = {
  entry: [
    './app/index'
  ],
  devtool: IS_PROD ? undefined : 'cheap-module-eval-source-map',
  target: 'web',
  module: {
    rules: [{
      test: /\.css$/,
      use: cssLoaders([], false)
    }, {
      test: /\.module\.scss$/,
      use: cssLoaders([{
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }], true)
    }, {
      test: /^((?!\.module\.scss$).)+\.scss$/,
      use: cssLoaders([{
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }], false)
    }, {
      test: /\.jsx?$/,
      use: [{
        loader: 'babel-loader'
      }],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      use: [{
        loader: 'json-loader'
      }]
    }, {
      test: /\.(woff2?|png|jpe?g)$/,
      use: [{
        loader: 'file-loader'
      }]
    }]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[name].[hash].js',
    publicPath: './'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    mainFields: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'module', 'main'],
    alias: {
      handlebars: 'handlebars/dist/handlebars.min.js'
    }
  },
  node: {
    Buffer: false,
    crypto: false,
    path: false
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './app/index.ejs'
    }),
    new CopyPlugin([{
      from: './app/resources/sprites',
      to: './sprites'
    }]),
    new webpack.DefinePlugin({
      '__DEV__': !IS_PROD,
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env['NODE_ENV'])
      }
    }),
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: true,
      disable: !IS_PROD
    }),
    new webpack.IgnorePlugin(/^(fs|crypto|path)$/),
    ...(IS_PROD ? [
      new UglifyJSPlugin({
        uglifyOptions: {
          ecma: 8,
          safari10: true
        }
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.js',
        minChunks: function(module, count) {
          var context = module.context;
          return context && context.indexOf('node_modules') >= 0;
        }
      })
    ] : [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin()
    ])
  ],
  devServer: {
    port: 3000,
    contentBase: './dist',
    publicPath: '/',
    inline: true,
    hot: true
  }
};
