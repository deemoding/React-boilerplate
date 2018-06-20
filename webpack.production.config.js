const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/index.jsx'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/antd/es')
        ],
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }, {
        test: /\.less$/,
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
            paths: [
              path.resolve(__dirname)
            ]
          }
        }]
      }, {
        test: /\.(png|jpg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: 'file-loader'
            }
          }
        ]
      }, {
        test: /\.js[x]?$/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.md$/,
        loader: "raw-loader"
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CleanWebpackPlugin(path.resolve(__dirname, 'build')),
    new LodashModuleReplacementPlugin(),
    new ParallelUglifyPlugin({
      uglifyES: {
        output: {
          beautify: false, // 不需要格式化
          comments: true, // 不保留注释
        },
        compress: {
          drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
          collapse_vars: true, // 内嵌定义了但是只用到一次的变量
          reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
        }
      }
    }),
    new CopyWebpackPlugin([
      { from: './public/*.json', to: '[name].[ext]' },
      { from: './public/favicon.ico', to: 'favicon.ico' },
    ]),
    new HtmlWebpackPlugin({
      hash: false,
      inject: false,
      template: 'public/index.html'
    })
  ]
};
