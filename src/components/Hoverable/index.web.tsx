/** @format */

import * as React from "react"
import ReactNativeWeb, { View } from "react-native-web"

export interface Props {
  onMouseEnter: () => void
  onMouseLeave: () => void
}

export default class extends React.Component<Props, {}> {
  private ref: React.RefObject<View> = React.createRef<View>()

  public componentDidMount() {
    if (this.ref.current !== null) {

      const node: HTMLElement = ReactNativeWeb.findNodeHandle(this.ref.current)
      node.addEventListener("mouseenter", this.props.onMouseEnter)
      node.addEventListener("mouseleave", this.props.onMouseLeave)
    }
  }

  public componentWillUnmount() {
    if (this.ref.current !== null) {

      const node: HTMLElement = ReactNativeWeb.findNodeHandle(this.ref.current)
      node.removeEventListener("mouseenter", this.props.onMouseEnter)
      node.removeEventListener("mouseleave", this.props.onMouseLeave)
    }
  }

  public render() {
    return (
      <View ref={this.ref}>
        {this.props.children}
      </View>
    )
  }
}
