var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf.js')
var entries = require('./../src/index.js')
var utils = require('./utils.js')

module.exports = merge(baseWebpackConfig, {
  entry: entries,
  output: {
    path: utils.resolve('dist/static'),
    filename: '[name].js'
  },
})