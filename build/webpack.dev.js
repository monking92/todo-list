const webpackMerge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.common')
// const webpack = require('webpack')

module.exports = webpackMerge(webpackBaseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map', // original source(lines only)
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
          'stylus-loader'
        ]
      }
    ]
  },
  devServer: {
    compress: true, // enable gzip compression for everything served
    contentBase: './dist',  // default: current working directory http://localhost:8080 webpackV5 -> static
    host: '0.0.0.0',
    hot: true,
    // open: true,
    overlay: {
      errors: true,
      warnings: true
    },
    port: 8088,
    publicPath: '/public/', // http://localhost:8080/public/index.html
    useLocalIp: true
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin()  // webpack v3
  ]
})
