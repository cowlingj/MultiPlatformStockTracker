module.exports = function(api) {
  api.cache(() => process.env.BABEL_ENV);
  return { 
  "presets": ["module:metro-react-native-babel-preset"],
  "env": {
    "dev-web": {
      "presets": [
        [ "@babel/env", {
          "targets": " >0.1%",
          "debug": true,
          "useBuiltIns": "usage"
        }]
      ],
      "plugins": [
        ["module-resolver", {"alias": {"^react-native$": "react-native-web"}}]
      ]
    },
    "prod-web": {},
    "dev-desktop": {
      "presets": [
        [ "@babel/env", {
          "targets": " >0.1%",
          "debug": true,
          "useBuiltIns": "usage"
        }]
      ],
      "plugins": [
        ["module-resolver", {"alias": {"^react-native$": "react-native-electron"}}]
      ]
    },
    "prod-desktop": {}
  }
}}