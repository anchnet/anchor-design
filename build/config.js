const packagePath = require('../packages_path.json')
const cssPath = require('../css_path.json')

const entries = {}

Object.keys(cssPath).forEach((name) => {
  entries['lib/css/' + name] = cssPath[name]
})

Object.keys(packagePath).forEach((name) => {
  entries['lib/' + name + '/index'] = packagePath[name]
})

entries['lib/index'] = './src/index.js'

module.exports = {
  entries
}