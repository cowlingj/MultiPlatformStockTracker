/** @format */

import { Mapper } from "../../../../archetecture/Store"
import { Increment, Decrement } from "../../Messages"
import { DataModel, itemsToDisplay } from ".."
import { StockListState } from "../../Model"
export class QuantMapper
  implements Mapper<Increment | Decrement, StockListState> {
  private state: DataModel
  constructor(state: DataModel) {
    this.state = state
  }
  public map(message: Increment | Decrement): StockListState {
    this.state = {
      items: this.state.items.map(item => {
        if (item.id !== message.id) {
          return item
        } else {
          return {
            id: item.id,
            name: item.name,
            quantity: message.quantity,
            inUse: item.inUse,
          }
        }
      }),
    }
    return itemsToDisplay(this.state)
  }
}
