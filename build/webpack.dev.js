const { merge } = require('webpack-merge')
const webpackBaseConfig = require('./webpack.common')
const path = require('path')
// const webpack = require('webpack')

module.exports = merge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
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
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin()  // webpack v3
  ]
})
