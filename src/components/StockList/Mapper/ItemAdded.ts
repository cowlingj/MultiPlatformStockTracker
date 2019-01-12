/** @format */

import { Mapper } from "../../../archetecture/Store"
import { AddItem } from "../Messages"
import { StockListState, DataModel, DataItem, itemsToDisplay } from "../Model"

export default class implements Mapper<AddItem, StockListState> {
  private model: DataModel
  private isHighlightedDefault: boolean

  constructor(model: DataModel, isHighlightedDefault: boolean) {
    this.model = model
    this.isHighlightedDefault = isHighlightedDefault
  }
  public map(message: AddItem) {
    const possibleIndex = this.model.state.items.findIndex(item => !item.inUse)
    let removed: DataItem[] = []
    if (possibleIndex !== -1) {
      removed = this.model.state.items.splice(possibleIndex, 1)
    }
    this.model.state.items.unshift({
      id: removed.length > 0 ? removed[0].id : this.model.state.items.length,
      name: message.name,
      quantity: message.quantity,
      isHighlited: this.isHighlightedDefault,
      inUse: true,
    })
    return itemsToDisplay(this.model.state)
  }
}
