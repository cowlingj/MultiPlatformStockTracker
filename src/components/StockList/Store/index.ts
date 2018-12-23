/** @format */

import { Store } from "../../../archetecture/Store"
import { Increment, Decrement, RemoveItem, Init, AddItem } from "../Messages"
import { StockListState, StockListItem } from "../Model"
import { QuantMapper } from "./Mapper/QuantMapper"
import { ItemAddedMapper } from "./Mapper/ItemAddedMapper"
import { ItemDeletedMapper } from "./Mapper/ItemDeletedMapper"

export interface DataItem extends StockListItem {
  id: number
  name: string
  quantity: number
  inUse: boolean
}

export interface DataModel extends StockListState {
  items: DataItem[]
}

export function itemsToDisplay(data: DataModel): StockListState {
  return { items: data.items.filter(item => item.inUse) }
}

export function quantChanged(
  state: DataModel
): Store<Increment | Decrement, StockListState> {
  return new Store(new QuantMapper(state))
}

export function itemAdded(state: DataModel): Store<AddItem, StockListState> {
  return new Store(new ItemAddedMapper(state))
}

export function itemDeleted(
  state: DataModel
): Store<RemoveItem, StockListState> {
  return new Store<RemoveItem, StockListState>(new ItemDeletedMapper(state))
}

export function initView(state: DataModel): Store<RemoveItem, StockListState> {
  return new Store<Init, StockListState>({ map: () => itemsToDisplay(state) })
}
