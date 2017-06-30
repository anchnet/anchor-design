const utils = require('./utils.js')
const webpack = require('webpack')
const merge = require('webpack-merge')
const env = require('../env/index')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  devServer: {
    contentBase: utils.webpackResolve('examples'),
    compress: true,
    port: 9088,
    hot: true
  },

  devtool: '#cheap-module-eval-source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': env.dev.env
    }),

    new HtmlWebpackPlugin({
      inject: true,
      template: utils.webpackResolve('examples/index.html')
    })
  ]
})