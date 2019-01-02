/** @format */

import { AppRegistry } from "react-native"
import App from "./Wrapper"
import { name as appName } from "../../app.json"

import load from "./load-fonts"
load()

AppRegistry.registerComponent(appName, () => App)

AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById("react-root"),
})
