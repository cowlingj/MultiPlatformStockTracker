/** @format */

const HtmlWebpackPlugin = require("html-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const path = require("path")
const config = require("./webpack-shared")
const webpack = require("webpack")

module.exports = {
  entry: path.join(__dirname, "..", "src", "entry", "index.web.ts"),
  output: {
    path: path.join(__dirname, "..", "dist"),
    filename: "bundle.js",
  },
  module: {
    rules: [config.rules.typescript, config.rules.javascript],
  },
  resolve: {
    extensions: config.extensionsFor([".web", ""]),
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new CleanWebpackPlugin([path.join(__dirname, "..", "dist")], {
      verbose: true,
      root: path.join(__dirname, ".."),
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "..", "src", "index.html"),
    }),
  ],
}
