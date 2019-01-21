/** @format */

import path from "path"

export const rules = [
  {
    test: /\.[jt]sx?$/,
    include: [/src/, /node_modules\/react-native-vector-icons/],
    use: [
      {
        loader: "babel-loader",
      },
    ],
  },
  {
    test: /\.ttf$/,
    loader: "url-loader",
    include: path.resolve(
      __dirname,
      "..",
      "node_modules",
      "react-native-vector-icons"
    ),
  },
  {
    test: /\.(png|jp(e?)g|svg)$/,
    use: [
      {
        loader: "url-loader",
        options: {
          limit: 8000, // Convert images < 8kb to base64 strings
          name: "images/[hash]-[name].[ext]",
        },
      },
    ],
  },
]

const extensionsEndings = [".json", ".tsx", ".ts", "jsx", ".js"]
export const extensionsFor = (qualifiers: string[]) => {
  return ([] as string[]).concat(
    ...qualifiers.map(qual => {
      return extensionsEndings.map(ext => {
        return qual + ext
      })
    })
  )
}
