/** @format */

import * as React from "react"
import { Text, View, Button } from "react-native"
import StockListVM from "./ViewModel"
import { Port } from "./Port";
import { Increment, Decrement, AddItem, RemoveItem } from "./Message";

export interface ItemState {
  items: Array<{
    id: number
    name: string
    quantity: number
  }>
}

interface Props {
  inc: Port<Increment>
  dec: Port<Decrement>
  add: Port<AddItem>
  del: Port<RemoveItem>
}

export default class App extends React.Component<Props, ItemState> {
  private viewModel: StockListVM

  constructor(props: Props) {
    super(props)
    // get initial state from port
    this.state = { items: [{ id: 0, name: "glass", quantity: 10 }] }

    this.viewModel = new StockListVM(
      props.inc.apply(() => this.state, (state) => this.setState(state)),
      props.dec.apply(() => this.state, (state) => this.setState(state)),
      props.add.apply(() => this.state, (state) => this.setState(state))
    )
  }

  public render() {
    return (
      <View>
        {this.state.items.map(item => (
          <View key={item.name}>
            <Text>
              <Text>{item.name}: </Text>
              <Text>{item.quantity}</Text>
            </Text>
            <Button
              onPress={() => {
                this.viewModel.inc(item.id, item.quantity)
              }}
              title='INCREMENT'
            />
            <Button
              onPress={() => {
                this.viewModel.dec(item.id, item.quantity)
              }}
              title='DECREMENT'
            />
          </View>
        ))}
        <Button
          onPress={() => {
            this.viewModel.add("New Item")
          }}
          title='ADD'
        />
      </View>
    )
  }
}
