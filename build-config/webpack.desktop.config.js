const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const webpack = require('webpack')

module.exports = [{
  watch: true,
  entry: { desktop: "./src/entry/index.desktop.js", },
  output: {
      path: path.join(__dirname, "..", "dist"),
      filename: "bundle.[name].js",
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
      rules: [
          {
              test: /\.js$/,
              include: [/src/, /node_modules\/react-.*/],
              loader: 'babel-loader',
              options: {
                  envName: 'dev-desktop',
              }
          }
      ]
  },
  mode: 'development',
  target: 'electron-main',
  resolve: {
      extensions: [ '.desktop.js', '.js' ]
  },
  plugins: [
    new webpack.DefinePlugin({
        __DEV__: JSON.stringify(true),
      })
  ]
 },
 {
    watch: true,
    entry: { web: "./src/entry/index.web.js", }, // FIXME
    output: {
      path: path.join(__dirname, "dist"),
      filename: "bundle.[name].js"
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [/src/, /node_modules\/react-.*/],
                loader: 'babel-loader',
                options: {
                    envName: 'dev-desktop',
                }
            }
        ]
    },
    mode: 'development',
    target: 'electron-renderer',
    resolve: {
        extensions: [ '.web.js' ,'.js' ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.desktop.html",
        template: "./src/index.html",
      }),
      new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('development')
        }
      }),
      new webpack.ProvidePlugin({
        React: 'react',
      })      
    ],
},]