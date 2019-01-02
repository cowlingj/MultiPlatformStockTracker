/** @format */

const path = require("path")

module.exports.rules = {
  typescript: {
    test: /\.tsx?$/,
    use: [
      {
        loader: "babel-loader",
      },
      {
        loader: "ts-loader",
        options: {
          configFile: path.resolve(__dirname, "tsconfig.json"),
        },
      },
    ],
    include: [/src/],
  },
  javascript: {
    test: /\.js$/,
    include: [/src/, /node_modules\/react-native-vector-icons/],
    use: [
      {
        loader: "babel-loader",
      },
    ],
  },
  ttf: {
    test: /\.ttf$/,
    loader: "url-loader",
    include: path.resolve(
      __dirname,
      "..",
      "node_modules/react-native-vector-icons"
    ),
  },
}

const extensionsEndings = [".json", ".tsx", ".ts", "jsx", ".js"]
module.exports.extensionsFor = function(qualifiers) {
  return [].concat(
    ...qualifiers.map(qual => {
      return extensionsEndings.map(ext => {
        return qual + ext
      })
    })
  )
}
