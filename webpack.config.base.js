/* eslint strict: 0 */
'use strict';

const path = require('path');
const pkg = require('./package.json');
const SpritesmithPlugin = require('webpack-spritesmith');
const templater = require('spritesheet-templates');
const HtmlWebpackPlugin = require('html-webpack-plugin');

templater.addTemplate('minimal_json', function minimalJson(data) {
  const ret = {
    image: data.spritesheet.image,
    height: data.spritesheet.height,
    width: data.spritesheet.width,
    sprites: {}
  };
  for (const sprite of data.sprites) {
    ret.sprites[sprite.name] = { x: sprite.offset_x, y: sprite.offset_y };
  }
  return JSON.stringify(ret);
});

module.exports = {
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loaders: ['json-loader']
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
    /*new SpritesmithPlugin({
      src: {
        cwd: 'app/resources/sprites/',
        glob: '*.png'
      },
      target: {
        image: 'app/resources/sprites.png',
        css: [['app/resources/sprites.json', { format: 'minimal_json' }]]
      },
      apiOptions: {
        cssImageRef: 'resources/sprites.png'
      }
    })*/
  ]
};
