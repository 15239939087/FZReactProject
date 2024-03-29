// webpack.base.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackBar = require('webpackbar');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const webpack = require('webpack')

module.exports = {
  entry: path.join(__dirname, '../src/index.tsx'), // 入口文件
  output: {
    filename: 'static/js/[name].js', // 每个输出js的名称
    path: path.join(__dirname, '../dist'), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: '/' // 打包后文件的公共前缀路径
  },
  module: {
    rules: [
      {
        include: [path.resolve(__dirname, '../src')],  //只对项目src文件的ts,tsx进行loader解析
        test: /.(ts|tsx)$/,
        use: ['thread-loader', 'babel-loader']
      },
      {
        test: /.css$/i, //匹配所有的 css 文件
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
        ]
      },
      {
        test: /.less$/, //匹配所有的 less 文件
        include: [path.resolve(__dirname, '../src')],
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test:/.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator:{ 
          filename:'static/images/[name][ext]', // 文件输出目录和命名
        },
      },
      {
        test:/.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator:{ 
          filename:'static/fonts/[name][ext]', // 文件输出目录和命名
        },
      },
      {
        test:/.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator:{ 
          filename:'static/media/[name][ext]', // 文件输出目录和命名
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
    alias: {
      '@': path.join(__dirname, '../src')
    },
    modules: [path.resolve(__dirname, '../node_modules')], // 查找第三方模块只在本项目的node_modules中查找
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'), // 模板取定义root节点的模板
      inject: true, // 自动注入静态资源
    }),
    new WebpackBar({
      color: "#4cd137",// 預設green，進度條顏色支援HEX
      basic: false,// 預設true，啟用一個簡單的日誌報告器
      profile:false,// 預設false，啟用探查器。
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:3111'],
      },
      // default is true
      clearConsole: true,
    }),
    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
    }),
  ],
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
}

console.log('NODE_ENV', process.env.NODE_ENV)
console.log('BASE_ENV', process.env.BASE_ENV)