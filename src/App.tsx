/** @format */

import StockList from "./components/StockList"
import * as React from "react"
import DispatcherFactory from "./components/StockList/Dispatcher/DispatcherFactory"
import {
  quantChanged,
  DataModel,
  itemAdded,
  itemDeleted,
  initView,
  itemHighLighted,
} from "./components/StockList/Store"
import { Platform } from "react-native";

const model: DataModel = { state: { items: [] } }

export default () => (
  <StockList
    {...{
      dispatcherFactory: new DispatcherFactory(),
      inc: quantChanged(model),
      dec: quantChanged(model),
      add: itemAdded(model, Platform.OS === "android" || Platform.OS === "ios"),
      del: itemDeleted(model),
      highlight: itemHighLighted(model),
      init: initView(model),
    }}
  />
)
