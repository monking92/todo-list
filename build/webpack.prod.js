const path = require('path')
const webpackMerge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.common')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = webpackMerge(webpackBaseConfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    // filename: '[name].[contenthash].js',
    filename: '[name].[chunkhash:16].js',
    // chunkFilename: ''
  },
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          MiniCssExtractPlugin.loader,
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
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash:16].css'
    })
  ],
  performance: {
    hints: 'warning',
    maxAssetSize: 250000,
    maxEntrypointSize: 250000
  },
  optimization: {
    moduleIds: 'hashed',
    minimize: true,
    minimizer: [
      new TerserJSPlugin({}),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    }
  }
})
