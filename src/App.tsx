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
} from "./components/StockList/Store"

const model: DataModel = { state: { items: [] } }

export default () => (
  <StockList
    {...{
      dispatcherFactory: new DispatcherFactory(),
      inc: quantChanged(model),
      dec: quantChanged(model),
      add: itemAdded(model),
      del: itemDeleted(model),
      init: initView(model),
    }}
  />
)
