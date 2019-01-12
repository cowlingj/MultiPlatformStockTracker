import Web from "./Router.web"
import Native from "./Router.native"
import { ComponentClass } from "react";
import { StyleProp, View } from "react-native";

declare function Router(props: {
  children?: (JSX.Element | ComponentClass<any>) |
             (JSX.Element | ComponentClass<any>)[],
}): JSX.Element

// ts - enforces interface compatability
declare var _ : typeof Router
declare var _ : typeof Web
declare var _ : typeof Native

export default Router