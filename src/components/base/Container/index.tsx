/** @format */

import { View, StyleProp, ViewStyle } from "react-native"
import Styles from "../../Styles"
import * as React from "react"

export default (props: {
  children: Array<JSX.Element | null>
  style: StyleProp<ViewStyle>
}) => <View style={[Styles.container, props.style]}>{props.children}</View>
