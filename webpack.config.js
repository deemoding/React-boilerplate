const webpack = require('webpack');
const path = require('path');
const opener = require('opener');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HappyPack = require('happypack');

const port = 65534;

module.exports = {
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    contentBase: './public',
    port
  },
  mode: "development",
  devtool: "eval",
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
        test: /\.js[x]?$/,
        exclude: [
          path.resolve(__dirname, 'node_modules/core-js'),
          path.resolve(__dirname, 'node_modules/@babel/runtime'),
        ],
        use: [
          'happypack/loader?id=js',
        ],
      }, {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          'happypack/loader?id=less',
        ],
      }, {
        // antd
        test: /\.less$/,
        include: /node_modules/,
        exclude: /src/,
        use: [
          'style-loader',
          'happypack/loader?id=antd',
        ]
      }, {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
        ],
      }, {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              fallback: 'file-loader' // 经过测试，如果不指定这个，也会默认用它处理
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HappyPack({
      id: 'js',
      loaders: [
        'babel-loader',
      ],
    }),
    new HappyPack({
      id: 'less',
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
          },
        },
        "postcss-loader",
        "less-loader",
      ]
    }),
    new HappyPack({
      id: 'antd',
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
    new HtmlWebpackPlugin({
      hash: false,
      inject: false,
      template: 'public/index.html'
    }),
    (() => {
      class Opener {
        constructor() {
          this.done = false;
        }

        apply(compiler) {
          compiler.hooks.done.tap('Opener', stats => {
            if (!(this.done || stats.hasErrors())) {
              opener(`http://localhost:${port}`);
              this.done = true;
            }
          });
        }
      }
      return new Opener();
    })(),
  ]
};
