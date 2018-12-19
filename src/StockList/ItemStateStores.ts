/** @format */

import { Store, StockListState  } from "./Store"
import Observer from "../observer/Observer"
import { Increment, Decrement, AddItem, RemoveItem, Init } from "./Messages"

type Item = {
  id: number
  name: string
  quantity: number
  inUse: boolean
}

interface DataModel {
  items: Array<Item>
}

let state: DataModel = { items: [] }

function itemsToDisplay(data: DataModel): StockListState {
  return { items: data.items.filter(item => item.inUse) }
}

export class QuantChanged implements Store<Increment | Decrement> {
  apply(setState: (state: StockListState) => void): Observer<Increment | Decrement> {
    return {
      onMessage(m) {
        state = {
          items: state.items.map(item => {
            if (item.id !== m.id) {
              return item
            } else {
              return { 
                id: item.id,
                name: item.name,
                quantity: m.quantity,
                inUse: item.inUse
              }
            }
          })
        }

        setState(itemsToDisplay(state))
      }
    }
  }
}

export class ItemAdded implements Store<AddItem> {
  apply(setState: (state: StockListState) => void): Observer<AddItem> {
    return {
      onMessage(m) {

        let possibleIndex = state.items.findIndex(item => !item.inUse)

        let removed: Item[] = []
        if (possibleIndex !== -1) {
          removed = state.items.splice(possibleIndex, 1)
        }
          state.items.push({
            id: removed.length > 0? removed[0].id : state.items.length,
            name: m.name,
            quantity: m.quantity,
            inUse: true
          })

        setState(itemsToDisplay(state))
      },
    }
  }
}

export class ItemDeleted implements Store<RemoveItem> {
  apply(setState: (state: StockListState) => void): Observer<RemoveItem> {
    return {
      onMessage(m) {

        const possibleIndex = state.items.findIndex(item => item.id === m.id)

        if (possibleIndex !== -1) {
          state.items[possibleIndex].inUse = false
        }

        setState(itemsToDisplay(state))
      },
    }
  }
}

export class InitView implements Store<Init> {
  apply(setState: (state: StockListState) => void): Observer<Init> {
    return {
      onMessage(_) {
        setState(itemsToDisplay(state))
      }
    }
  }
}
