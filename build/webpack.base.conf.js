var path = require('path')
var utils = require('./utils.js')

module.exports = {
  entry: './examples/main.js',

  output: {
    path: utils.webpackResolve('dist/static/'),
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: 'css-loader',
            scss: 'vue-style-loader!css-loader!sass-loader',
            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        use: [
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')()
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.join('static', 'img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.join('static', 'fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },

  resolve: {
    extensions: ['.vue', '.js', '.scss', '.json'],
    modules: [utils.webpackResolve('packages'), 'node_modules'],
    alias: {
      'vue$': 'vue/dist/vue.js',
      'scss': utils.webpackResolve('src/scss'),
      'Src': utils.webpackResolve('src/'),
      'Packages': utils.webpackResolve('packages/'),
      'Examples': utils.webpackResolve('examples/')
    }
  }
}