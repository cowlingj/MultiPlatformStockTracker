/** @format */

import * as React from "react"
import { Text, View, Button } from "react-native"
import Dispatcher from "./Dispatcher"
import DispatcherFactory from "./Dispatcher/DispatcherFactory"
import Adder from "../Adder"
import { Store } from "../../archetecture/Store"
import { Increment, Decrement, RemoveItem, Init, AddItem } from "./Messages"
import { StockListState } from "./Model"
import * as AdderStores from "../Adder/Store"
import AdderDispatcherFactory from "../Adder/Dispatcher/DispatcherFactory"

export interface Props {
  dispatcherFactory: DispatcherFactory
  inc: Store<Increment, StockListState>
  dec: Store<Decrement, StockListState>
  del: Store<RemoveItem, StockListState>
  init: Store<Init, StockListState>
  add: Store<AddItem, StockListState>
}

export default class StockList extends React.Component<Props, StockListState> {
  private dispatcher: Dispatcher
  private adderDispatcherFactory = new AdderDispatcherFactory()

  constructor(props: Props) {
    super(props)

    const setState = this.setState.bind(this)
    const initialState = (state: StockListState) => (this.state = state)

    this.adderDispatcherFactory.subcribeAdd(props.add.apply(setState))

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
        <Adder
          {...{
            dispatcherFactory: this.adderDispatcherFactory,
            add: AdderStores.itemAdded(),
            update: AdderStores.update(),
            init: AdderStores.initView(),
          }}
        />
      </View>
    )
  }
}
