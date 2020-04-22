const path = require('path');
const opener = require('opener');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = 65534;
const HTTPS = true;

module.exports = {
  devServer: {
    // host: '0.0.0.0',
    port,
    contentBase: './public',
    https: HTTPS,
    http2: HTTPS,
    clientLogLevel: 'trace',
    historyApiFallback: true,
    hot: true,
    inline: true,
    // open: true,
    // openPage: '',
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
        exclude: /\bcore-js\b/,
        loader: 'babel-loader'
      }, {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: '[local]-[contenthash:8]',
              },
              importLoaders: 2,
              localsConvention: 'camelCase',
              esModule: true,
              // context: path.resolve(__dirname, "../"),
            },
          },
          "postcss-loader",
          "less-loader",
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
              javascriptEnabled: true,
            },
          },
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
    // alias: {
    //   "@ant-design/icons/lib/dist$": path.resolve(__dirname, "src/antd/icon.js"),
    // },
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: false,
      inject: false,
      template: 'public/index.html'
    }),
    // custom browser opener, only open browser when build successful
    (() => {
      class Opener {
        constructor() {
          this.done = false;
        }

        apply(compiler) {
          compiler.hooks.done.tap('Opener', stats => {
            if (!(this.done || stats.hasErrors())) {
              opener(`${HTTPS ? 'https' : 'http'}://localhost:${port}`);
              this.done = true;
            }
          });
        }
      }
      return new Opener();
    })(),
  ]
};
