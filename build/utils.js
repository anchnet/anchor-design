var path = require('path')

exports.webpackResolve = function (str) {
  return path.resolve(__dirname, '..', str)
}