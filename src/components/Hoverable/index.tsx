/** @format */

import { Component } from "react"
import { View } from "react-native";

export interface Props {
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export default class extends Component<Props, {}> {
  public componentDidMount() {}
  public componentWillUnmount() {}
  public render() {
    return <View>{this.props.children}</View>
  }
}
