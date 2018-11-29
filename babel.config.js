/** @format */

const commonConfig = require("./build-config/babel/common")
const platformConfig = require("./build-config/babel/" + process.env.PLATFORM)

const envs = ["all", process.env.ENV]

const config = envs.reduce(
  function(acc, env) {
    return {
      presets: acc.presets.concat(
        commonConfig[env].presets,
        platformConfig[env].presets
      ),
      plugins: acc.plugins.concat(
        commonConfig[env].plugins,
        platformConfig[env].plugins
      ),
    }
  },
  {
    presets: [],
    plugins: [],
  }
)

module.exports = function(api) {
  api.cache(() => process.env.BABEL_ENV)
  return config
}
