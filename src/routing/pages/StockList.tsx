import StockList from '../../components/StockList'
import * as React from "react"
import {
  DataModel,
  itemsToDisplay,
} from "../../components/StockList/Model"
import { Platform } from "react-native"
import { Store } from '../../archetecture/Store';
import Observable from '../../archetecture/observer/Observable';
import { Init, Increment, Decrement, AddItem, RemoveItem, Highlight } from '../../components/StockList/Messages';
import { StockListState } from '../../components/StockList/Model';
import QuantityChanged from '../../components/StockList/Mapper/QuantityChanged';
import ItemAdded from '../../components/StockList/Mapper/ItemAdded';
import ItemDeleted from '../../components/StockList/Mapper/ItemDeleted';
import ItemHighLighted from '../../components/StockList/Mapper/ItemHighLighted';
import Dispatcher from '../../components/StockList/Dispatcher';
import Adder from '../../components/Adder';
import AdderDispatcher from '../../components/Adder/Dispatcher'
import { AddState } from '../../components/Adder/Model';
import { Update, Init as AdderInit } from '../../components/Adder/Messages';

const model: DataModel = { state: { items: [] } }

const inc = new Observable<Increment>()
const dec = new Observable<Decrement>()
const add = new Observable<AddItem>()
const del = new Observable<RemoveItem>()
const highlight = new Observable<Highlight>()
const init = new Observable<Init>()

const adderUpdate = new Observable<Update>()
const adderInit = new Observable<AdderInit>()

export default () => (<StockList
  {...{
    inc: new Store<Increment, StockListState>(new QuantityChanged(model), inc),
    dec: new Store<Decrement, StockListState>(new QuantityChanged(model), dec),
    add: new Store<AddItem, StockListState>(
      new ItemAdded(model, Platform.OS === "android" || Platform.OS === "ios"),
      add
    ),
    del: new Store<RemoveItem, StockListState>(new ItemDeleted(model), del),
    highlight: new Store<Highlight, StockListState>(
      new ItemHighLighted(model),
      highlight
    ),
    init: new Store<Init, StockListState>(
      { map: () => itemsToDisplay(model.state) },
      init
    ),
    dispatcher: new Dispatcher(inc, dec, del, highlight, init),
    Adder: () => (<Adder {...{
      add: new Store<AddItem, AddState>(
        { map() { return { name: "" } } },
        add
      ),
      update: new Store<Update, AddState>(
        { map(message: Update) { return { name: message.name } } },
        adderUpdate
      ),
      init: new Store<Init, AddState>(
        { map() { return { name: "" } } }, 
        adderInit
      ),
      dispatcher: new AdderDispatcher(add, adderUpdate, adderInit)
    }} />)
  }} />)
