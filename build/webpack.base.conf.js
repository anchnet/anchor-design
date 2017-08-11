const path = require('path')
const webpack = require('webpack')
const utils = require('./utils.js')
const env = require('../env/index')

const autoprefixer = require('autoprefixer')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  resolve: {
    extensions: ['.vue', '.js', '.scss', '.json'],
    modules: [utils.webpackResolve('packages'), 'node_modules'],
    alias: {
      'vue$': 'vue/dist/vue.js',
      'scss': utils.webpackResolve('src/scss'),
      'src': utils.webpackResolve('src/'),
      'packages': utils.webpackResolve('packages/'),
      'examples': utils.webpackResolve('examples/')
    }
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: () => process.env === 'production' ? [autoprefixer()] : [],
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'sass-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [autoprefixer()]
              }
            }
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 102400,
          name: utils.subPath('img/[name].[hash:7].[ext]')
        }
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
}