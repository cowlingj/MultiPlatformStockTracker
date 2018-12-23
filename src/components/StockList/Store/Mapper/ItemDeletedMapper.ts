/** @format */

import { Mapper } from "../../../../archetecture/Store"
import { RemoveItem } from "../../Messages"
import { DataModel, itemsToDisplay } from ".."
import { StockListState } from "../../Model"
export class ItemDeletedMapper implements Mapper<RemoveItem, StockListState> {
  private state: DataModel
  constructor(state: DataModel) {
    this.state = state
  }
  public map(message: RemoveItem) {
    const possibleIndex = this.state.items.findIndex(
      item => item.id === message.id
    )
    if (possibleIndex !== -1) {
      this.state.items[possibleIndex].inUse = false
    }
    return itemsToDisplay(this.state)
  }
}
