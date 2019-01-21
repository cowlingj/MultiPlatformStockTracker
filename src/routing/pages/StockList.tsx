/** @format */

import StockList from "../../components/StockList"
import * as React from "react"
import Observable from "../../archetecture/observer/Observable"
import Dispatcher from "../../components/StockList/dispatcher"
import Adder from "../../components/AdderButton"
import AdderDispatcher from "../../components/AdderButton/dispatcher"
import HistoryService from "../../services/HistoryService"
import { RouteComponentProps, withRouter } from "react-router"
import {
  StockListStateService,
  DataModel,
} from "../../services/StockListStateService"
import { View, Text } from "react-native"

const StockListRenderer = (
  props: RouteComponentProps & { stockListStateService: StockListStateService }
) => {
  const stateUpdater = new Observable<DataModel>()

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "stretch" }}>
      <StockList
        {...{
          stateUpdater,
          dispatcher: new Dispatcher(props.stockListStateService, stateUpdater),
        }}
      />
      <View
        style={{
          backgroundColor: "red",
        }}>
        <View
          style={{
            padding: "2%",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}>
          <Adder
            dispatcher={new AdderDispatcher(new HistoryService(props.history))}
          />
        </View>
        <Text style={{ backgroundColor: "yellow" }}>snackbar</Text>
      </View>
    </View>
  )
}

export default withRouter(StockListRenderer)
