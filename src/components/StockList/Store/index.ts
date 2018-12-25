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

export interface DataModel {
  state: { items: DataItem[] }
}

export function itemsToDisplay(data: { items: DataItem[] }): StockListState {
  return {
    items: data.items
      .filter(item => item.inUse)
      .map(({ inUse, ...item }) => item),
  }
}

export function quantChanged(
  model: DataModel
): Store<Increment | Decrement, StockListState> {
  return new Store(new QuantMapper(model))
}

export function itemAdded(model: DataModel): Store<AddItem, StockListState> {
  return new Store(new ItemAddedMapper(model))
}

export function itemDeleted(
  model: DataModel
): Store<RemoveItem, StockListState> {
  return new Store<RemoveItem, StockListState>(new ItemDeletedMapper(model))
}

export function initView(model: DataModel): Store<Init, StockListState> {
  return new Store<Init, StockListState>({
    map: () => itemsToDisplay(model.state),
  })
}
