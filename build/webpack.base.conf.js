var utils = require('./utils.js')

module.exports = {
  entry: './examples/main.js',

  output: {
    path: utils.resolve('../dist/'),
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: 'sass-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }
    ]
  },

  resolve: {
    extensions: ['.vue', '.js', '.scss', '.json'],
    modules: [utils.resolve('packages'), 'node_modules'],
    alias: {
      'vue$': 'vue/dist/vue.js',
      'packages': utils.resolve('../../packages/'),
      'src': utils.resolve('../../src/')
    }
  }
}