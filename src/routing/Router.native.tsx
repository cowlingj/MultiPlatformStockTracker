import { NativeRouter } from "react-router-native";
import { View } from "react-native";
import React, { ComponentClass } from "react";

export default function Router(props: {
  children?: (JSX.Element | ComponentClass<any>) |
             (JSX.Element | ComponentClass<any>)[]
}): JSX.Element {
  return <NativeRouter><View style={{flex: 1}}>{props.children}</View></NativeRouter>
} 