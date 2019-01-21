/** @format */

import * as React from "react"
import { View } from "react-native"

export interface Props {
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export default class extends React.Component<Props, {}> {
  public render() {
    return <View>{this.props.children}</View>
  }
}
