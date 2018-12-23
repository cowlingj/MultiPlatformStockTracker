/** @format */

import StockList from "./components/StockList/View"
import * as React from "react"
import DispatcherFactory from "./components/StockList/Dispatcher/DispatcherFactory"
import Observable from "./archetecture/observer/Observable"
import {
  Increment,
  Decrement,
  RemoveItem,
  Init,
} from "./components/StockList/Messages"
import {
  quantChanged,
  DataModel,
  itemAdded,
  itemDeleted,
  initView,
} from "./components/StockList/Store"
import { DispatcherFactory as AdderDispatcherFactory } from "./components/Adder/Dispatcher/DispatcherFactory"
import { AddItem, Update, Init as AdderInit } from "./components/Adder/Messages"
import {
  itemAdded as adderItemAdded,
  update,
  initView as adderInitView,
} from "./components/Adder/Store"

const model: DataModel = { items: [] }

export default () => (
  <StockList
    {...{
      dispatcherFactory: new DispatcherFactory(
        new Observable<Increment>(),
        new Observable<Decrement>(),
        new Observable<RemoveItem>(),
        new Observable<Init>()
      ),
      inc: quantChanged(model),
      dec: quantChanged(model),
      add: itemAdded(model),
      del: itemDeleted(model),
      init: initView(model),
      adder: {
        dispatcherFactory: new AdderDispatcherFactory(
          new Observable<AddItem>(),
          new Observable<Update>(),
          new Observable<AdderInit>()
        ),
        add: adderItemAdded(),
        update: update(),
        init: adderInitView(),
      },
    }}
  />
)
