/** @format */

import * as React from "react"
import { View } from "react-native"
import Dispatcher from "./Dispatcher"
import DispatcherFactory from "./Dispatcher/DispatcherFactory"
import Adder from "../Adder"
import { Store } from "../../archetecture/Store"
import {
  Increment,
  Decrement,
  RemoveItem,
  Init,
  AddItem,
  HighLight,
} from "./Messages"
import { StockListState } from "./Model"
import * as AdderStores from "../Adder/Store"
import AdderDispatcherFactory from "../Adder/Dispatcher/DispatcherFactory"
import StockListItem from "./StockListItem"

export interface Props {
  dispatcherFactory: DispatcherFactory
  inc: Store<Increment, StockListState>
  dec: Store<Decrement, StockListState>
  del: Store<RemoveItem, StockListState>
  init: Store<Init, StockListState>
  add: Store<AddItem, StockListState>
  highlight: Store<HighLight, StockListState>
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
    props.dispatcherFactory.subscribeHighlight(props.highlight.apply(setState))
    props.dispatcherFactory.subscribeInit(props.init.apply(initialState))
    this.dispatcher = props.dispatcherFactory.create()
  }

  public render() {
    return (
      <View>
        <Adder
          {...{
            dispatcherFactory: this.adderDispatcherFactory,
            add: AdderStores.itemAdded(),
            update: AdderStores.update(),
            init: AdderStores.initView(),
          }}
        />
        {this.state.items.map(item => (
          <StockListItem
            key={item.id}
            id={item.id}
            name={item.name}
            quantity={item.quantity}
            inc={this.dispatcher.inc.bind(this.dispatcher)}
            dec={this.dispatcher.dec.bind(this.dispatcher)}
            del={this.dispatcher.del.bind(this.dispatcher)}
            highlight={this.dispatcher.makeHighlighted.bind(this.dispatcher)}
            unHighlight={this.dispatcher.makeUnhighlighted.bind(
              this.dispatcher
            )}
            view={() => {}}
            isHighlighted={item.isHighlited}
          />
        ))}
      </View>
    )
  }
}
