/** @format */

import * as React from "react"
import { Text, View, Button } from "react-native"
import Dispatcher from "./Dispatcher"
import DispatcherFactory from "./Dispatcher/DispatcherFactory"
import Adder, { Props as AdderProps } from "../Adder/View"
import { Store } from "../../archetecture/Store"
import { Increment, Decrement, RemoveItem, Init, AddItem } from "./Messages"
import { StockListState } from "./Model"

export interface Props {
  dispatcherFactory: DispatcherFactory
  inc: Store<Increment, StockListState>
  dec: Store<Decrement, StockListState>
  del: Store<RemoveItem, StockListState>
  init: Store<Init, StockListState>
  add: Store<AddItem, StockListState>

  adder: AdderProps
}

export default class StockList extends React.Component<Props, StockListState> {
  private dispatcher: Dispatcher

  constructor(props: Props) {
    super(props)

    const setState = this.setState.bind(this)
    const initialState = (state: StockListState) => (this.state = state)

    props.adder.dispatcherFactory.subcribeAdd(props.add.apply(setState))

    props.dispatcherFactory.subscribeInc(props.inc.apply(setState))
    props.dispatcherFactory.subscribeDec(props.dec.apply(setState))
    props.dispatcherFactory.subscribeDel(props.del.apply(setState))
    props.dispatcherFactory.subscribeInit(props.init.apply(initialState))
    this.dispatcher = props.dispatcherFactory.create()
  }

  public render() {
    return (
      <View>
        {this.state.items.map(item => (
          <View key={item.id}>
            <Text>
              <Text>
                {item.name} [{item.id}]:{" "}
              </Text>
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
            <Button
              onPress={() => {
                this.dispatcher.del(item.id)
              }}
              title='DELETE'
            />
          </View>
        ))}
        <Adder {...this.props.adder} />
      </View>
    )
  }
}
