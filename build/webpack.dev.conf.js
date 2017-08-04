const utils = require('./utils.js')
const webpack = require('webpack')
const merge = require('webpack-merge')
const env = require('../env/index')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  entry: env.dev.entry,

  output: {
    path: utils.webpackResolve('dist/static/'),
    publicPath: env.dev.publicPath,
    filename: '[name].js'
  },

  devServer: {
    contentBase: utils.webpackResolve('examples'),
    historyApiFallback: true,
    clientLogLevel: 'warning',
    compress: true,
    port: 9088,
    hot: true
  },

  devtool: '#cheap-module-eval-source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': env.dev.env
    }),

    new webpack.ProvidePlugin({
      vQuery: utils.webpackResolve('src/libs/vQuery')
    }),

    new HtmlWebpackPlugin({
      template: utils.webpackResolve('examples/index.html'),
      inject: true,
      chunks: ['main'],
      filename: 'index.html'
    }),

    new HtmlWebpackPlugin({
      template: utils.webpackResolve('examples/demo/index.html'),
      inject: true,
      chunks: ['demo'],
      filename: 'demo/index.html'
    })
  ]
})