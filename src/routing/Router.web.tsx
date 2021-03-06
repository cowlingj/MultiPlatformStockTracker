/** @format */

import { BrowserRouter } from "react-router-dom"
import { View } from "react-native"
import React, { ComponentClass } from "react"

export default function Router(props: {
  children?:
    | (JSX.Element | ComponentClass<any>)
    | Array<JSX.Element | ComponentClass<any>>
}): JSX.Element {
  return (
    <BrowserRouter>
      <View style={{ flex: 1 }}>{props.children}</View>
    </BrowserRouter>
  )
}
