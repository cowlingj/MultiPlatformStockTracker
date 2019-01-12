/** @format */

export default {
  getTransformModulePath() {
    return require.resolve("react-native-typescript-transformer")
  },
  getSourceExts() {
    return ["tsx", "ts", "jsx", "js", "json"]
  },
}
