const path = require('path')
const webpack = require('webpack')
const utils = require('./utils.js')
const env = require('../env/index')

module.exports = {
  entry: env.dev.entry,

  output: {
    path: utils.webpackResolve('dist/static/'),
    filename: '[name].js'
  },

  resolve: {
    extensions: ['.vue', '.js', '.scss', '.json'],
    modules: [utils.webpackResolve('packages'), 'node_modules'],
    alias: {
      'vue$': 'vue/dist/vue.js',
      'scss': utils.webpackResolve('src/scss'),
      'Src': utils.webpackResolve('src/'),
      'Packages': utils.webpackResolve('packages/'),
      'Examples': utils.webpackResolve('examples/')
    }
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: 'css-loader',
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: ['node_modules']
      },
      {
        test: /\.scss$/,
        use: [
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')()
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.webpackResolve('static/img/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}