/** @format */

import { Mapper } from "../../../../archetecture/Store"
import { AddItem } from "../../Messages"
import { DataModel, DataItem, itemsToDisplay } from ".."
import { StockListState } from "../../Model"
export class ItemAddedMapper implements Mapper<AddItem, StockListState> {
  private model: DataModel
  constructor(model: DataModel) {
    this.model = model
  }
  public map(message: AddItem) {
    const possibleIndex = this.model.state.items.findIndex(item => !item.inUse)
    let removed: DataItem[] = []
    if (possibleIndex !== -1) {
      removed = this.model.state.items.splice(possibleIndex, 1)
    }
    this.model.state.items.push({
      id: removed.length > 0 ? removed[0].id : this.model.state.items.length,
      name: message.name,
      quantity: message.quantity,
      inUse: true,
    })
    return itemsToDisplay(this.model.state)
  }
}
