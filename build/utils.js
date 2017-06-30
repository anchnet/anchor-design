var path = require('path')

exports.webpackResolve = function (str) {
  if (typeof str === 'string') {
    return path.resolve(__dirname, '..', str)
  } else {
    return path.resolve(__dirname, '..')
  }
}