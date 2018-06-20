const webpack = require('webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = 65534;

module.exports = {
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    contentBase: './public',
    port
  },
  entry: [
    path.resolve(__dirname, 'src/index.jsx')
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, 'public'),
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/antd/es')
        ],
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }, {
        test: /\.(png|jpg|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              fallback: 'file-loader' // 经过测试，如果不指定这个，也会默认用它处理
            }
          }
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: `http://localhost:${port}` }),
    new HtmlWebpackPlugin({
      hash: false,
      inject: false,
      template: 'public/index.html'
    })
  ]
};
