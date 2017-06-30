// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  dev: {
    env: require('./dev.env'),
    entry: './examples/main.js',
    port: 9088,
    cssSourceMap: false
  },
  build: {
    env: require('./prod.env'),
    productionSourceMap: true
  }
}
