const merge = require('webpack-merge')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.conf.js')
const config = require('./config')
const env = require('../env/index')
const utils = require('./utils.js')

module.exports = merge(baseWebpackConfig, {
  entry: config.entries,

  output: {
    path: utils.webpackResolve('anchor-design'),
    filename: '[name].js'
  },

  devtool: env.build.productionSourceMap ? '#source-map' : false,

  plugins: [
    new webpack.DefinePlugin({
      'process.env': env.build.env
    }),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        collapse_vars: true,
        reduce_vars: true
      },
      sourceMap: true
    })
  ]
})