/** @format */

import * as React from "react"
import { Text, View, Button } from "react-native"
import StockListVM from "./StockListVM"

interface ItemState {
  items: Array<{
    name: string
    quantity: number
  }>
}

export default class App extends React.Component<{}, ItemState> {
  private viewModel: StockListVM

  constructor(props: any) {
    super(props)
    this.state = { items: [{ name: 'glass', quantity: 10 }] }

    const self = this
    this.viewModel = new StockListVM(
      {
        onMessage(inc) {
          self.setState((currentState: ItemState) => {
            return { items: currentState.items.map(item => {
              if (item.name === inc.name) {
                return { name: inc.name, quantity: inc.value }
              } else {
                return item
              }
            })
          }
        })
        },
      },
      {
        onMessage(dec) {
          self.setState(currentState => {
            return {
            items: currentState.items.map(item => {
              if (item.name === dec.name) {
                return { name: dec.name, quantity: dec.value }
              } else {
                return item
              }
            })
          }})
        },
      }
    )
  }

  public render() {
    return (
      <View>
        {this.state.items.map(item => (
          <View key={item.name} >
            <Text>
              <Text>{item.name}: </Text>
              <Text>{item.quantity}</Text>
            </Text>
            <Button
              onPress={() => {
                this.viewModel.inc(item.name, item.quantity)
              }}
              title='INCREMENT'
            />
            <Button
              onPress={() => {
                this.viewModel.dec(item.name, item.quantity)
              }}
              title='DECREMENT'
            />
          </View>
        ))}
      </View>
    )
  }
}
