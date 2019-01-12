/** @format */

import * as React from "react"
import { FlatList } from "react-native"
import Dispatcher from "./Dispatcher"
import { Store } from "../../archetecture/Store"
import {
  Increment,
  Decrement,
  RemoveItem,
  Init,
  AddItem,
  Highlight,
} from "./Messages"
import { StockListState, StockListItem as ModelItem } from "./Model"
import StockListItem from "./StockListItem"

export interface Props {
  dispatcher: Dispatcher
  inc: Store<Increment, StockListState>
  dec: Store<Decrement, StockListState>
  del: Store<RemoveItem, StockListState>
  init: Store<Init, StockListState>
  add: Store<AddItem, StockListState>
  highlight: Store<Highlight, StockListState>
  Adder: React.ComponentType
}

export default class StockList extends React.Component<Props, StockListState> {
  constructor(props: Props) {
    super(props)

    const setState = this.setState.bind(this)
    const initialState = (state: StockListState) => (this.state = state)
    
    props.add.apply(setState)
    props.inc.apply(setState)
    props.dec.apply(setState)
    props.del.apply(setState)
    props.highlight.apply(setState)
    props.init.apply(initialState)

    props.dispatcher.init()
  }

  public render() {
    return (
      <FlatList
        style={{ flex: 1 }}
        data={([] as ("adder" | ModelItem)[]).concat("adder", this.state.items)}
        keyExtractor={item => {
          if (item === "adder") {
            return item
          } else {
            return item.id.toString()
          }
        }}
        renderItem={({ item }) => {
          if (item === "adder") {
            return (<this.props.Adder />)
          } else {
            return (
              <StockListItem
                key={item.id}
                id={item.id}
                name={item.name}
                quantity={item.quantity}
                inc={this.props.dispatcher.inc.bind(this.props.dispatcher)}
                dec={this.props.dispatcher.dec.bind(this.props.dispatcher)}
                del={this.props.dispatcher.del.bind(this.props.dispatcher)}
                highlight={this.props.dispatcher.makeHighlighted.bind(
                  this.props.dispatcher
                )}
                unHighlight={this.props.dispatcher.makeUnhighlighted.bind(
                  this.props.dispatcher
                )}
                view={() => {}}
                isHighlighted={item.isHighlited}
              />
            )
          }
        }}
      />
    )
  }
}
