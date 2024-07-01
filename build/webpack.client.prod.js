const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const webpackCommonConfig = require('./webpack.common')
const path = require('path')

module.exports = merge(webpackCommonConfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    // filename: '[name].[contenthash].js',
    filename: 'js/[name].[chunkhash:16].js',
    // chunkFilename: '',
    clean: true
  },
  module: {
    rules: [
      {
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
    // new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[id].[contenthash:16].css'
      // filename: '[name].[contenthash].css',
      // chunkFilename: '[id].[contenthash:16].css',

    })
  ],
  performance: {
    hints: 'warning',
    maxAssetSize: 250000,
    maxEntrypointSize: 250000
  },
  optimization: {
    // 默认情况下 module.id是基于 resolve 顺序递增的， resolve顺序改变 id也会改变
    // 当 module.id 改变的时候 bundle的hash也会改变 导致打包出的bundle名也会改变
    // // NamedModulesPlugin（v4+ 被`namedModules: true`替代） 将使用模块的路径，而不是数字标识符
    // // 有助于在development中输出结果的可读性，但执行时间会长一些
    // HashedModuleIdsPlugin（v4+ 被`moduleIds: true`替代） 另一个选择 推荐用于production环境
    // moduleIds: 'hashed',
    // moduleIds: 'deterministic', // use default
    minimize: true,
    minimizer: [
      new TerserJSPlugin({}),
      new CssMinimizerPlugin({})
    ],

    // 推荐使用默认值 或 splitChunks: { chunks: 'all' }
    // splitChunks: {
    //   cacheGroups: {
    //     vendor: {
    //       // 这可能会产生包含所有外部包的很大的 chunk。建议只引入核心框架和工具，其他依赖则动态加载
    //       // test: /[\\/]node_modules[\\/]/,
    //       test: /[\\/]node_modules[\\/](vue|vue-router)[\\/]/,
    //       name: 'vendor',
    //       // chunks: 'all'
    //       chunks: 'initial'
    //     },
    //     common: {
    //       name: 'common',
    //       minChunks: 2,
    //       priority: -20,
    //       chunks: 'initial',
    //       reuseExistingChunk: true
    //     }
    //   },
    // },

    // 为 `runtimeChunk: 'single'`别名
    // 会为所有生成的 chunks 创建一个共享的 runtime 文件
    runtimeChunk: {
      name: 'runtime'
    }
  }
})
