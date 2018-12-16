/** @format */

import * as React from "react"
import { Text, View, Button } from "react-native"
import StockListVM from "./StockListVM";

interface AppState {
  item: {
    name: string
    quantity: number
  }
}

export default class App extends React.Component<{}, AppState> {
  private viewModel: StockListVM

  constructor(props: any) {
    super(props)
    this.state = {
      item: {
        name: "glass",
        quantity: 0,
      },
    }

    const self = this
    this.viewModel = new StockListVM({
      onMessage(inc) {
         self.setState({item: {
           name: inc.name,
           quantity: inc.value
          }
        })
      }
    }, {
      onMessage(dec) {
        self.setState({item: {
          name: dec.name,
          quantity: dec.value
         }
       })
      }
    })
  }

  public render() {
    return (
      <View>
        <Text>
          <Text>{this.state.item.name}: </Text>
          <Text>{this.state.item.quantity}</Text>
        </Text>
        <Button onPress={
          ()=>{this.viewModel.inc(this.state.item.name, this.state.item.quantity)}
          } title="INCREMENT" />
        <Button onPress={
          ()=>{this.viewModel.dec(this.state.item.name, this.state.item.quantity)}
          } title="DECREMENT" />
      </View>
    )
  }
}
