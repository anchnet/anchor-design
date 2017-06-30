const packagePath = require('./bin/package-path')

const entries = {}

Object.keys(packagePath).forEach((name) => {
  entries['lib/' + name + '/index'] = packagePath[name]
})

entries['lib/index'] = './src/index.js'

module.exports = {
  entries
}