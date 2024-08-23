const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpackBaseConfig = require('./webpack.common')

module.exports = merge(webpackBaseConfig, {
  target: 'node',
  entry: './client/server-entry.js',
  output: {
    // nodejs 规范
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  devtool: '#source-map',
  // 作为外部依赖排除打包（node环境 可以require到）
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
              // publicPath: './'
            }
          },
          'css-loader'
        ]
      }, {
        test: /\.styl(us)?$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
              // publicPath: './'
            }
          },
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
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash:16].css'
      // filename: '[name].[contenthash].css',
      // chunkFilename: '[id].[contenthash:16].css',
    })
    // new webpack.HotModuleReplacementPlugin()  // webpack v3
  ]
})
