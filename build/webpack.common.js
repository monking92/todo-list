const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  context: path.resolve(__dirname, '..'),
  entry: {
    main: './src/main.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
          // options: {
          //   presets: [
          //     "@babel/preset-env",
          //     {
          //       "useBuiltIns": "usage",
          //       "corejs": "2.6.12"
          //     }
          //   ]
          // }
        }
      }, {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 3 * 1024,
              fallback: 'file-loader',
              outputPath: 'img', // 存放路径
              // publicPath: '', // 引用路径
              name: '[name].[hash:8].[ext]'
            }
          }
        ]
      }, {
        test: /\.(woff2?|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 3 * 1024,
              fallback: 'file-loader',
              outputPath: 'font',
              name: '[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '#': path.resolve(__dirname, '../src/assets'),
      'assets': path.resolve(__dirname, '../src/assets'),
    },
    extensions: ['.js', '.vue', '.jsx']
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'todo-list',
      template: path.resolve(__dirname, '..', 'index.html')
    })
  ]
}
