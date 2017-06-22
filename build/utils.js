var path = require('path')

exports.resolve = function (str) {
  return path.resolve(__dirname, str)
}