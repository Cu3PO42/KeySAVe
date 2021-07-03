/* eslint strict: 0 */
'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { GenerateSW }= require('workbox-webpack-plugin');
const PreloadPlugin = require('@vue/preload-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const { NODE_ENV } = process.env;
if (NODE_ENV !== 'production' && NODE_ENV !== 'development') {
  throw new Error('Must set NODE_ENV to either production or development.');
}

const IS_PROD = process.env['NODE_ENV'] === 'production';

const cssLoaders = (other, modules) => [
  // Do not extract in development mode for hot reloading
  IS_PROD ? MiniCssExtractPlugin.loader : 'style-loader',
  {
    loader: require.resolve('css-loader'),
    options: {
      sourceMap: true,
      // Enable CSS Modules to scope class names
      modules,
      minimize: IS_PROD,
      importLoaders: 1 + other.length,
    },
  },
  {
    // Adjust URLs in CSS files so that they are relative to the source file rather than the output file
    loader: require.resolve('resolve-url-loader'),
  },
  ...other,
];

const stats = {
  assets: true,

  // Do not show copied files
  excludeAssets: [/sprites\/.*\.png$/],

  // Show html-webpack-plugin output
  children: true,

  // Do not show division of chunks into modules
  modules: false,
};

module.exports = {
  entry: [
    // Main entry point of the application
    './src/index',
  ],

  mode: NODE_ENV,
  devtool: IS_PROD ? false : 'eval-cheap-module-source-map',
  target: 'web',

  optimization: {
    // Split the bundles into as many chunks as is sensible to improve cacheability.
    splitChunks: {
      chunks: "all",
    },

    // Use names for chunks instead of their IDs, this improves cachebility
    moduleIds: "named",
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        // No CSS modules for normal CSS files
        use: cssLoaders([], false),
      },

      {
        test: /\.module\.scss$/,
        // SCSS with CSS modules
        use: cssLoaders(
          [
            {
              loader: require.resolve('sass-loader'),
              options: {
                sourceMap: true,
              },
            },
          ],
          true
        ),
      },

      {
        test: /^((?!\.module\.scss$).)+\.scss$/,
        // SCSS without CSS modules
        use: cssLoaders(
          [
            {
              loader: require.resolve('sass-loader'),
              options: {
                sourceMap: true,
              },
            },
          ],
          false
        ),
      },

      {
        test: /\.jsx?$/,
        use: [
          {
            loader: require.resolve('babel-loader'),
          },
        ],
        exclude: /node_modules/,
      },

      {
        test: /\.(woff2?|png|jpe?g)$/,
        use: [
          {
            loader: require.resolve('file-loader'),
          },
        ],
      },
    ],
  },

  output: {
    // Output everything to dist
    path: path.join(__dirname, 'dist'),

    // Hash the entry module based on the version of the build
    filename: '[name].[fullhash].js',

    // Hash chunks based on their own hashes for better versioning
    chunkFilename: '[name].[chunkhash].js',

    // Configure a relative path for deployment
    publicPath: './',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    mainFields: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'module', 'main'],
    alias: {
      // Use the production build of handlebars to avoid warning about require.resolve
      handlebars: require.resolve('handlebars/dist/handlebars.min.js'),
      // Use production build because it bundles required dependencies
      jszip: require.resolve('jszip/dist/jszip.min.js'),
    },
    // Ignore Node modules imported by KeySAVCore
    fallback: {
      buffer: false,
      crypto: false,
      path: false,
    }
  },

  // Apply modified stat output
  stats,

  plugins: [
    // Create an HTML file with all chunks injected
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './src/index.ejs',
    }),

    // Copy the sprites used by the pretty formatter
    new CopyPlugin({
      patterns: [
        {
          from: './src/resources/sprites',
          to: './sprites',
        },
      ],
    }),

    // Get rid of warnings for unused imports in KeySAVCore
    new webpack.IgnorePlugin({ resourceRegExp: /^(fs|crypto|path)$/ }),

    // Only load moment locales corresponding to languages supported by the games
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /(de|en|fr|en|zh-cn|ko|ja)$/),

    // Add preload tags for browsers without support for service workers
    new PreloadPlugin({
      fileBlacklist: [/sprites\/.*\.png$/, /pkm-local\/.*\.js$/],
    }),


    // Plugins specific to production mode
    ...(IS_PROD
      ? [
          // Write the style output to its own CSS file
          new MiniCssExtractPlugin({
            filename: 'style.[chunkhash].css',
          }),

          // Generate a service worker to handle offline availability
          new GenerateSW({
            // Use a prefix to avoid collisions on localhost and GH pages
            cacheId: 'keysave',

            // These URLs include hashes and therefore version themselves, tce cache can be assumed correct
            dontCacheBustURLsMatching: /\.\w{20}\.\w+$/,

            // Filename of the output file
            swDest: 'sw.js',

            // Do not precache sprites and localizations
            exclude: [/sprites\/.*\.png$/, /pkm-local\/.*\.js$/],

            runtimeCaching: [
              // Cache sprites when they are requested
              {
                urlPattern: /sprites\/.*\.png/,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'pretty-sprite-cache',
                },
              },

              // Cache localizations when they are requested
              {
                urlPattern: /pkm-local\/.*\.js/,
                handler: 'CacheFirst',
                options: {
                  cacheName: 'pretty-sprite-cache',
                },
              },
            ],
          }),

          // Output an analysis of the generated chunks
          new BundleAnalyzerPlugin({
            // Generate the output in form of a static file
            analyzerMode: 'static',
            reportFilename: '../bundle-analysis.html',

            // Do not open the generated output automatically
            openAnalyzer: false,
          }),
        ]
          // These plugins are only used in development mode
      : [
          // Do not emit a bundle if any errors occur
          new webpack.NoEmitOnErrorsPlugin(),

          // Enable hot module replacement
          new webpack.HotModuleReplacementPlugin(),

          // React Fast Refresh
          new ReactRefreshWebpackPlugin(),
        ]),
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

    // Show compilation errors fullscreen instead of the application
    overlay: true,

    // Apply the different logging
    stats,
  },
};
