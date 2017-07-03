const path = require('path')
const env = require('../env/index')

exports.webpackResolve = function (str) {
  if (typeof str === 'string') {
    return path.resolve(__dirname, '..', str)
  } else {
    return path.resolve(__dirname, '..')
  }
}

exports.subPath = function (dir) {
  var subDirectory = process.env.NODE_ENV === 'production'
    ? env.build.subDirectory
    : env.dev.subDirectory
  return path.posix.join(subDirectory, dir)
}