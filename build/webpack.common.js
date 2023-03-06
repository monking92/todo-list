const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: path.resolve(__dirname, '..', 'src/main.js')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }, {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8 * 1024,
            fallback: 'file-loader',
            outputPath: 'img',
            name: '[name].[hash:8].[ext]'
          }
        }]
      }
    ]
  },
  resolve: {
    alias: {
      '#': path.resolve(__dirname, '../src/assets')
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
