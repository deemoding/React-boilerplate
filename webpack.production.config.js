const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  mode: "production",
  entry: {
    app: path.resolve(__dirname, 'src/index.jsx'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[contenthash:8].min.js'
  },
  cache: {
    type: 'memory',
  },
  devtool: false,
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: [
          /core-js/,
          /@babel\/runtime/,
        ],
        loader: 'babel-loader'
      }, {
        test: /\.less$/,
        exclude: /node_modules/,
        // FIXME:样式表不生成sourcemap
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: '[contenthash:8]',
                exportLocalsConvention: 'camelCaseOnly',
              },
              importLoaders: 2,
              sourceMap: true,
            },
          },
          "postcss-loader",
          {
            loader: "less-loader",
            options: {
              sourceMap: true,
            }
          }
        ],
      }, {
        test: /\.less$/,
        include: /node_modules/,
        exclude: /src/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              }
            },
          },
        ]
      }, {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      }, {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: 'file-loader'
            }
          }
        ]
      }, {
        test: /\.md$/,
        loader: "raw-loader"
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    // alias: {
    //   "@ant-design/icons/lib/dist$": path.resolve(__dirname, "src/antd/icon.js"),
    // },
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      maxInitialRequests: 30,
      maxAsyncRequests: 30,
      maxSize: 100_000,
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js[x]?$/,
        // ignored in webpack5
        // cache: false,
        parallel: true,
        // Works only with
        // source-map, inline-source-map, hidden-source-map and nosources-source-map values
        // for the devtool option
        // sourceMap: false,
        terserOptions: {
          output: {
            beautify: false, // 不需要格式化
            comments: false, // 不保留注释
          },
          compress: {
            booleans: false,
            // drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
            pure_funcs: ["console.log", "console.info", "console.debug", "console.trace"],
            collapse_vars: true, // 内嵌定义了但是只用到一次的变量
            reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
          },
        },
      }),
      new CssMinimizerPlugin({
        test: /\.(css|less)$/,
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/
    }),
    new CleanWebpackPlugin({
      verbose: true,
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[contenthash:8].min.css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './public/*.json', to: '[name].[ext]' },
        { from: './public/favicon.ico', to: 'favicon.ico' },
      ]
    }),
    new HtmlWebpackPlugin({
      hash: false,
      inject: false,
      // scriptLoading: 'blocking',
      template: 'public/index.html'
    }),
    new BundleAnalyzerPlugin(),
  ]
};
