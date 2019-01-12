/** @format */

import HtmlWebpackPlugin from "html-webpack-plugin"
import CleanWebpackPlugin from "clean-webpack-plugin"
import path from "path"
import * as config from "./webpack-shared"
import webpack from "webpack"

const plugins = [
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
]

if (process.env.ENV == "dev") {
  plugins.push(new webpack.HotModuleReplacementPlugin())
}

export default {
  mode: 'development', // TODO: change so it looks at env
  devtool: 'inline-source-map',
  entry: {
    app: path.join(__dirname, "..", "src", "entry", "index.web.ts"),
  },
  output: {
    path: path.join(__dirname, "..", "dist"),
    filename: "[name]-bundle.js",
    publicPath: '/',
  },
  module: {
    rules: config.rules,
  },
  resolve: {
    extensions: config.extensionsFor([".web", ""]),
  },
  plugins,
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    historyApiFallback: true,
    hot: true,
    https: true,
    index: path.join(__dirname, 'dist', 'index.html'),
    open: true,
    publicPath: "/",
  }
}
