/** @format */

import * as React from "react"
import { FlatList, ActivityIndicator, View, Text } from "react-native"
import Dispatcher from "./dispatcher"
import { StockListState, StockListItem as ModelItem } from "./model"
import StockListItem from "./StockListItem"
import Subscribable from "../../archetecture/observer/Subscribable";
import { DataModel } from "../../services/StockListStateService";
import { map } from "./mapper";

export interface Props {
  dispatcher: Dispatcher
  stateUpdater: Subscribable<DataModel>
}

export default class StockList extends React.Component<Props, StockListState> {
  constructor(props: Props) {
    super(props)

    const setState = this.setState.bind(this)
    props.stateUpdater.subscribe({ onMessage(data) { setState(map(data)) }})
    props.dispatcher.init()
  }

  public render() {
    if (this.state === null) {
      return <ActivityIndicator/>
    }

    return (
      <FlatList
        ItemSeparatorComponent={() => (<View style={{borderBottomWidth: 1, borderBottomColor: "black"}}></View>)}
        ListEmptyComponent={() => (<Text>no items to display</Text>)}
        style={{ flex: 1 }}
        data={([] as ModelItem[]).concat(this.state.items)}
        keyExtractor={ item => item.id.toString() }
        renderItem={({ item }) => {
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
                isHighlighted={item.isHighlighted}
              />
            )
        }}
      />
    )
  }
}
