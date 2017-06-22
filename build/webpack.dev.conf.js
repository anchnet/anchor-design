var utils = require('./utils.js')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  devServer: {
    contentBase: utils.webpackResolve('examples'),
    compress: true,
    port: 9088,
    hot: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: utils.webpackResolve('examples/index.html')
    })
  ]
})