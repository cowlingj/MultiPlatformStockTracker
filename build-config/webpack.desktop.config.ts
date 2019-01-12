/** @format */

import HtmlWebpackPlugin from "html-webpack-plugin"
import CleanWebpackPlugin from "clean-webpack-plugin"
import path from "path"
import webpack from "webpack"
import * as config from "./webpack-shared"

module.exports = [
  {
    entry: {
      desktop: path.join(__dirname, "..", "src", "entry", "index.desktop.ts"),
    },
    output: {
      path: path.join(__dirname, "..", "dist"),
      filename: "bundle.[name].js",
    },
    node: {
      __dirname: false,
      __filename: false,
    },
    module: {
      rules: config.rules,
    },
    mode: "development",
    target: "electron-main",
    resolve: {
      extensions: config.extensionsFor([".desktop", ""]),
    },
    plugins: [
      new CleanWebpackPlugin([path.join(__dirname, "..", "dist")], {
        verbose: true,
        root: path.join(__dirname, ".."),
      }),
    ],
  },
  {
    entry: { web: path.join(__dirname, "..", "src", "entry", "index.web.ts") },
    output: {
      path: path.join(__dirname, "..", "dist"),
      filename: "bundle.[name].js",
    },
    node: {
      __dirname: false,
      __filename: false,
    },
    module: {
      rules: config.rules,
    },
    mode: "development",
    target: "electron-renderer",
    resolve: {
      extensions: config.extensionsFor([".web", ""]),
    },
    plugins: [
      new webpack.ProvidePlugin({
        React: "react",
      }),
      new HtmlWebpackPlugin({
        filename: "index.desktop.html",
        template: path.join(__dirname, "..", "src", "index.html"),
      }),
    ],
  },
]
