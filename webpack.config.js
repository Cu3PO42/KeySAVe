/* eslint strict: 0 */
'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const SWPrecachePlugin = require('sw-precache-webpack-plugin');

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

const stats = {
  assets: true,

  // Do not show copied files
  excludeAssets: [/sprites\/.*\.png$/],

  // Show html-webpack-plugin output
  children: true,

  // Do not show division of chunks into modules
  modules: false
};

module.exports = {
  entry: [
    // Main entry point of the application
    './src/index'
  ],

  devtool: IS_PROD ? undefined : 'cheap-module-eval-source-map',
  target: 'web',

  module: {
    rules: [{
      test: /\.css$/,
      // No CSS modules for normal CSS files
      use: cssLoaders([], false)
    }, 
    
    {
      test: /\.module\.scss$/,
      // SCSS with CSS modules
      use: cssLoaders([{
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }], true)
    },
    
    {
      test: /^((?!\.module\.scss$).)+\.scss$/,
      // SCSS without CSS modules
      use: cssLoaders([{
        loader: 'sass-loader',
        options: {
          sourceMap: true
        }
      }], false)
    },
    
    {
      test: /\.jsx?$/,
      use: [{
        loader: 'babel-loader'
      }],
      exclude: /node_modules/
    },
    
    {
      test: /\.json$/,
      use: [{
        loader: 'json-loader'
      }]
    },
    
    {
      test: /\.(woff2?|png|jpe?g)$/,
      use: [{
        loader: 'file-loader'
      }]
    }]
  },

  output: {
    // Output everything to dist
    path: path.join(__dirname, 'dist'),
    // Hash the entry module based on the version of the build
    filename: '[name].[hash].js',
    // Hash chunks based on their own hashes for better versioning
    chunkFilename: '[name].[chunkhash].js',
    // Configure a relative path for deployment
    publicPath: './'
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    mainFields: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'module', 'main'],
    alias: {
      // Use the production build of handlebars to avoid warning about require.resolve
      handlebars: 'handlebars/dist/handlebars.min.js'
    }
  },

  // Apply modified stat output
  stats,

  // Ignore Node modules imported by KeySAVCore
  node: {
    Buffer: false,
    crypto: false,
    path: false
  },

  plugins: [
    // Create an HTML file with all chunks injected
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './src/index.ejs'
    }),

    // Copy the sprites used by the pretty formatter
    new CopyPlugin([{
      from: './src/resources/sprites',
      to: './sprites'
    }]),

    // Define environment variables for runtime specific behavior
    new webpack.DefinePlugin({
      '__DEV__': !IS_PROD,
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env['NODE_ENV'])
      }
    }),

    // Write the style output to its own CSS file
    new ExtractTextPlugin({
      filename: 'style.[chunkhash].css',
      allChunks: true,
      // Do not extract text in development mode to enable hot reloading
      disable: !IS_PROD
    }),

    // Get rid of warnings for unused imports in KeySAVCore
    new webpack.IgnorePlugin(/^(fs|crypto|path)$/),

    // Only load moment locales corresponding to languages supported by the games
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /(de|en|fr|en|zh-cn|ko|ja)$/),

    // Use the module names instead of IDs
    // This improves their cachebility because names do not change whereas IDs are just enumerated
    new webpack.NamedModulesPlugin(),

    // Generate a service worker to handle offline availability
    new SWPrecachePlugin({
      // Use a prefix to avoid collisions on localhost and GH pages
      cacheId: 'keysave',

      // These URLs include hashes and therefore version themselves, tce cache can be assumed correct
      dontCacheBustUrlsMatching: /\.\w{20}\.\w+$/,

      // Filename of the output file
      filename: 'sw.js',

      // Minify the service worker code in production
      minify: IS_PROD,
      
      // Include assets generated by Webpack
      mergeStaticsConfig: true,

      // Do not precache sprites and localizations
      staticFileGlobsIgnorePatterns: [/sprites\/.*\.png$/, /pkm-local\/.*\.js/],

      // Do not cache in development
      handleFetch: IS_PROD,

      // Cache sprites when they are requested
      runtimeCaching: [{
        urlPattern: /sprites\/.*\.png/,
        handler: 'cacheFirst',
        options: {
          cache: {
            name: 'pretty-sprite-cache'
          }
        }
      },
      
      // Cache localizations when they are requested
      {
        urlPattern: /pkm-local\/.*\.js/,
        handler: 'cacheFirst',
        options: {
          cache: {
            name: 'local-cache'
          }
        }
      }]
    }),

    // Plugins specific to production mode
    ...(IS_PROD ? [
      // Minify JavaScript
      new UglifyJSPlugin({
        uglifyOptions: {
          ecma: 8,
          safari10: true
        },
        parallel: true
      }),

      // Concatenate modules where possible, i.e. hoist them together into one module
      // This enables smaller builds and faster execution
      new webpack.optimize.ModuleConcatenationPlugin(),

      // Use names for chunks instead of their IDs, this improves cachebility
      new webpack.NamedChunksPlugin(),

      // Extract all code in node_modules into a vendor chunk
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function(module, count) {
          var context = module.context;
          return context && context.indexOf('node_modules') >= 0;
        }
      }),

      // Extract webpack boilerplate and manifest (i.e. list of chunk names)
      // This means that the vendor or app bundle isn't invalidated when other chunks change
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest'
      }),

      // Output an analysis of the generated chunks
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: '../bundle-analysis.html'
      })
    // These plugins are only used in development mode
    ] : [
      // Do not emit a bundle if any errors occur
      new webpack.NoEmitOnErrorsPlugin(),

      // Enable hot module replacement
      new webpack.HotModuleReplacementPlugin(),
    ])
  ],

  devServer: {
    port: 3000,

    // Files from this directory are served in addition to generated bundles
    contentBase: './dist',

    // Specifies what directory the bundles are served form
    publicPath: '/',

    // Inject scripts for hot reloading into the bundles
    inline: true,

    // Enable hot reloading
    hot: true,

    // Apply the different logging
    stats
  }
};
