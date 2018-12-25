/** @format */

import { AppRegistry } from "react-native"
import App from "./Wrapper"
import { name as appName } from "../../app.json"

AppRegistry.registerComponent(appName, () => App)

if (window.document) {
  AppRegistry.runApplication(appName, {
    initialProps: {},
    rootTag: document.getElementById("react-root"),
  })
}
