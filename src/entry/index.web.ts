/** @format */

import { AppRegistry } from "react-native"
import App from "./Wrapper"

AppRegistry.registerComponent("web", () => App)

if (window.document) {
  AppRegistry.runApplication("web", {
    initialProps: {},
    rootTag: document.getElementById("react-root"),
  })
}
