const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  //watch: true,
  entry: "./src/entry/index.web.js",
  output: {
      path: path.join(__dirname, "..", "dist"),
      filename: "bundle.js"
  },
  module: {
      rules: [
        {
            test: /\.tsx?$/,
            use: [{
                loader: 'babel-loader',
            },
            {
                loader: "ts-loader",
                options: { "configFile": path.resolve(__dirname, "tsconfig.json") }
            }],
            include: [ /src/ ]
        },
        {
            test: /\.js$/,
            include: [ /src/ ],
            loader: 'babel-loader',
        }
      ]
  },
  resolve: {
      extensions: [ 'web.tsx', 'web.ts', '.web.js', '.tsx', '.ts', '.js', '.json' ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html"
    })
  ]
 }