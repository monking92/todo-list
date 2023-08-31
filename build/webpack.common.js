const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
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
        test: /\.jsx?$/,
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
            loader: 'url-loader', // 
            options: {
              limit: 3 * 1024,
              fallback: 'file-loader',
              outputPath: 'img', // 存放路径
              // publicPath: '', // 引用路径
              name: '[name].[hash:8].[ext]',
              // webpack5中file-loader使用了esModule语法 资源的引用路径会变为[object]
              esModule: false
            },
          }
        ],
        // Asset Modules types replace all of the url-loader, file-loader, raw-loader in webpack5
        // When using the old assets loaders (i.e. file-loader/url-loader/raw-loader) along with Asset Modules in webpack 5
        // you might want to stop Asset Modules from processing your assets again as that would result in asset duplication.
        // using `type: 'javascript/auto'`
        type: 'javascript/auto'
      }, {
        test: /\.(woff2?|ttf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 3 * 1024,
              fallback: 'file-loader',
              outputPath: 'font',
              name: '[name].[hash:8].[ext]',
              esModule: false
            }
          }
        ],
        type: 'javascript/auto'
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
