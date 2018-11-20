/** @format */

import * as React from "react"
import { Text, View } from "react-native"

interface AppState {
  item: {
    name: string
    quantity: number
  }
}

export default class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props)
    this.state = {
      item: {
        name: "glass",
        quantity: 0,
      },
    }
  }

  public render() {
    return (
      <View>
        <Text>
          <Text>{this.state.item.name}: </Text>
          <Text>{this.state.item.quantity}</Text>
        </Text>
      </View>
    )
  }
}
