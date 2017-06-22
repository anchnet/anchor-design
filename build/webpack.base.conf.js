var utils = require('./utils.js')

module.exports = {
  entry: './examples/main.js',

  output: {
    path: utils.webpackResolve('dist/'),
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
    modules: [utils.webpackResolve('packages'), 'node_modules'],
    alias: {
      'vue$': 'vue/dist/vue.js',
      'Packages': utils.webpackResolve('packages/'),
      'Src': utils.webpackResolve('src/'),
      'Examples': utils.webpackResolve('examples/')
    }
  }
}