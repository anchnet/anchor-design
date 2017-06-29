var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf.js')
var config = require('./config')
var utils = require('./utils.js')

module.exports = merge(baseWebpackConfig, {
  entry: config.entries,

  output: {
    path: utils.webpackResolve('anchor-ui'),
    filename: '[name].js'
  },
})