/** @format */

import { TouchableHighlight, StyleProp, ViewStyle } from "react-native"
import React from "react"
import Dispatcher from "./dispatcher"
import Icon from "react-native-vector-icons/FontAwesome";

export interface Props {
  dispatcher: Dispatcher
  style?: StyleProp<ViewStyle>
}

export default class extends React.PureComponent<Props, {}> {

  constructor(props: Props) {
    super(props)
  }

  public render() {
    return (
        <TouchableHighlight
          onPress={() => this.props.dispatcher.add()}
        style={[{
          height: 48,
          width: 48,
          borderRadius: 48,
          backgroundColor: "green",
          justifyContent: "center",
          alignContent: "center",
          elevation: 10,
          shadowOffset: { width: 0, height: 4},
          shadowRadius: 2
        }, this.props.style]}>
        <Icon name="plus" style={{
          fontSize: 18,
          color: "white",
          textAlign: "center",
          textAlignVertical: "center"
        }}/>
        </TouchableHighlight>
    )
  }
}
