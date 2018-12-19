/** @format */

import * as React from "react"
import { Text, View, Button } from "react-native"
import Dispatcher from "./Dispatcher"
import { Store, StockListState } from "./Store"
import { Increment, Decrement, AddItem, RemoveItem, Init } from "./Messages"

interface Props {
  inc: Store<Increment>
  dec: Store<Decrement>
  add: Store<AddItem>
  del: Store<RemoveItem>
  init: Store<Init>
}

export default class App extends React.Component<Props, StockListState> {
  private dispatcher: Dispatcher

  constructor(props: Props) {
    super(props)

    this.dispatcher = new Dispatcher(
      props.inc.apply(state => this.setState(state)),
      props.dec.apply(state => this.setState(state)),
      props.add.apply(state => this.setState(state)),
      props.del.apply(state => this.setState(state)),
      props.init.apply(state => this.state = state)
    )
  }

  public render() {
    return (
      <View>
        {this.state.items.map(item => (
          <View key={item.id}>
            <Text>
              <Text>{item.name} [{item.id}]: </Text>
              <Text>{item.quantity}</Text>
            </Text>
            <Button
              onPress={() => {
                this.dispatcher.inc(item.id, item.quantity)
              }}
              title='INCREMENT'
            />
            <Button
              onPress={() => {
                this.dispatcher.dec(item.id, item.quantity)
              }}
              title='DECREMENT'
            />
            <Button onPress={() => {this.dispatcher.del(item.id)}} title="DELETE" />
          </View>
        ))}
        <View>
        <Button
          onPress={() => {
            this.dispatcher.add("New Item")
          }}
          title='ADD'
        />
        </View>
      </View>
    )
  }
}
