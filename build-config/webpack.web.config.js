const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')
const config = require('./webpack-shared')

module.exports = {
  // TODO: reload on change below and watchamn 
  // watch: true,
  entry: path.join(__dirname, "..", "src", "entry", "index.web.js"),
  output: {
      path: path.join(__dirname, "..", "dist"),
      filename: "bundle.js"
  },
  module: {
      rules: [ config.rules.typescriptFor("dev-web"), config.rules.javascriptFor("dev-web")]
  },
  resolve: {
      extensions: config.extensionsFor([".web", ""])
  },
  plugins: [
    // TODO: not working?
    new CleanWebpackPlugin([path.join(__dirname, "..", "dist")], { verbose: true }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "..", "src", "index.html")
    })
  ]
 }