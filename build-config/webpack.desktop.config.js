const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
const config = require('./webpack-shared')

module.exports = [{
  //watch: true,
  entry: { desktop: path.join(__dirname, "..", "src", "entry", "index.desktop.js") },
  output: {
      path: path.join(__dirname, "..", "dist"),
      filename: "bundle.[name].js",
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  module: {
      rules: [config.rules.typescriptFor('dev-desktop'), config.rules.javascriptFor('dev-desktop')]
  },
  mode: 'development',
  target: 'electron-main',
  resolve: {
      extensions: config.extensionsFor(['.desktop', ''])
  },
  plugins: [
    new CleanWebpackPlugin([path.join(__dirname, "..", "dist")]),
  ]
 },
 {
    //watch: true,
    entry: { web: path.join(__dirname, "..", "src", "entry", "index.web.js") },
    output: {
      path: path.join(__dirname, "..", "dist"),
      filename: "bundle.[name].js"
    },
    node: {
        __dirname: false,
        __filename: false,
    },
    module: {
        rules: [ config.rules.typescriptFor('dev-desktop'), config.rules.javascriptFor('dev-desktop') ]
    },
    mode: 'development',
    target: 'electron-renderer',
    resolve: {
        extensions: config.extensionsFor(['.web', ''])
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.desktop.html",
        template: path.join(__dirname, "..", "src", "index.html"),
      }),    
    ],
},]