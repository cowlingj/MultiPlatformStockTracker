/** @format */

import { Mapper } from "../../../../archetecture/Store"
import { AddItem } from "../../Messages"
import { DataModel, DataItem, itemsToDisplay } from ".."
import { StockListState } from "../../Model"
export class ItemAddedMapper implements Mapper<AddItem, StockListState> {
  private state: DataModel
  constructor(state: DataModel) {
    this.state = state
  }
  public map(message: AddItem) {
    const possibleIndex = this.state.items.findIndex(item => !item.inUse)
    let removed: DataItem[] = []
    if (possibleIndex !== -1) {
      removed = this.state.items.splice(possibleIndex, 1)
    }
    this.state.items.push({
      id: removed.length > 0 ? removed[0].id : this.state.items.length,
      name: message.name,
      quantity: message.quantity,
      inUse: true,
    })
    return itemsToDisplay(this.state)
  }
}
