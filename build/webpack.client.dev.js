const { merge } = require('webpack-merge')
const webpackCommonConfig = require('./webpack.common')
const path = require('path')

module.exports = merge(webpackCommonConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }, {
        test: /\.styl(us)?$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      }
    ]
  },
  devServer: {
    compress: true, // enable gzip compression for everything served
    host: '0.0.0.0',
    port: 8088,
    hot: true,
    open: true,
    client: {
      overlay: {
        errors: true,
        warnings: true,
        runtimeErrors: true
      }
    },
    static: {
      directory: path.join(__dirname, '../dist'), // current working directory
      publicPath: '/public/' // http://localhost:8080/public/index.html visit dist/index.html
    }
  }
})
