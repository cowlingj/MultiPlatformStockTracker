/** @format */

import Web from "./Router.web"
import Native from "./Router.native"
import { ComponentClass } from "react"
import { StyleProp, View } from "react-native"

declare function Router(props: {
  children?:
    | (JSX.Element | ComponentClass<any>)
    | Array<JSX.Element | ComponentClass<any>>
}): JSX.Element

// ts - enforce interface compatability
// tslint:disable: no-duplicate-variable
declare var _: typeof Router
declare var _: typeof Web
declare var _: typeof Native
// tslint:enable

export default Router
