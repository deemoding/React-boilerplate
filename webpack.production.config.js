const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HappyPack = require('happypack');
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");

const smp = new SpeedMeasurePlugin({
  disable: false,
  outputTarget: './build/speedReport.txt',
  // outputFormat: 'json',
});

module.exports = smp.wrap({
  mode: "production",
  entry: {
    app: path.resolve(__dirname, 'src/index.jsx'),
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[chunkhash:8].min.js'
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: [
          /node_modules\/core-js/,
          /node_modules\/@babel\/runtime/,
        ],
        use: [
          'happypack/loader?id=js',
        ],
      }, {
        test: /\.less$/,
        exclude: /node_modules/,
        // FIXME:样式表不生成sourcemap
        use: [
          MiniCssExtractPlugin.loader,
          'happypack/loader?id=less',
        ],
      }, {
        test: /\.less$/,
        include: /node_modules/,
        exclude: /src/,
        use: [
          MiniCssExtractPlugin.loader,
          'happypack/loader?id=antd',
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
    alias: {
      "@ant-design/icons/lib/dist$": path.resolve(__dirname, "src/antd/icon.js"),
    },
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.js[x]?$/,
        cache: false,
        parallel: true,
        // Works only with
        // source-map, inline-source-map, hidden-source-map and nosources-source-map values
        // for the devtool option
        sourceMap: false,
        terserOptions: {
          output: {
            beautify: false, // 不需要格式化
            comments: false, // 不保留注释
          },
          compress: {
            booleans: false,
            drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
            collapse_vars: true, // 内嵌定义了但是只用到一次的变量
            reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.(css|less)$/,
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new HappyPack({
      id: 'js',
      threads: 7,
      loaders: [
        'babel-loader',
      ]
    }),
    new HappyPack({
      id: 'less',
      threads: 7,
      loaders: [
        {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: '[local]-[contenthash:base64:8]',
              context: path.resolve(__dirname),
            },
            importLoaders: 2,
            localsConvention: 'camelCase',
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
      ]
    }),
    new HappyPack({
      id: 'antd',
      threads: 7,
      loaders: [
        'css-loader',
        {
          loader: 'less-loader',
          options: {
            javascriptEnabled: true,
          },
        },
      ]
    }),
    new CleanWebpackPlugin({
      verbose: true,
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[chunkhash:8].min.css',
    }),
    new CopyWebpackPlugin([
      { from: './public/*.json', to: '[name].[ext]' },
      { from: './public/favicon.ico', to: 'favicon.ico' },
    ]),
    new HtmlWebpackPlugin({
      hash: false,
      inject: false,
      template: 'public/index.html'
    }),
    new BundleAnalyzerPlugin(),
  ]
});
