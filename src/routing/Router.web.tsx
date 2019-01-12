import { BrowserRouter } from "react-router-dom";
import { View } from "react-native";
import React, { ComponentClass } from "react";

export default function Router(props: {
  children?: (JSX.Element | ComponentClass<any>) |
             (JSX.Element | ComponentClass<any>)[]
}): JSX.Element {
  return <BrowserRouter><View style={{flex: 1, height: "100%"}}>{props.children}</View></BrowserRouter>
} 