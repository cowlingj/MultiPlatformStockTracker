/** @format */

import { HighLight } from "../../Messages"
import { StockListState } from "../../Model"
import { Mapper } from "../../../../archetecture/Store"
import { DataModel, itemsToDisplay } from ".."
import IllegalOperationError from "../../../../util/error/IllegalOperationError"
import IllegalStateError from "../../../../util/error/IllegalStateError"

export default class implements Mapper<HighLight, StockListState> {
  model: DataModel

  constructor(model: DataModel) {
    this.model = model
  }

  map(message: HighLight): StockListState {
    const singletonArrayToUpdate = this.model.state.items.filter(
      item => item.id === message.id
    )

    if (singletonArrayToUpdate.length < 1) {
      throw new IllegalOperationError("no matching ids")
    }

    if (singletonArrayToUpdate.length > 1) {
      throw new IllegalStateError("multiple matching ids")
    }

    singletonArrayToUpdate[0].isHighlited = message.isHighlighted

    return itemsToDisplay(this.model.state)
  }
}
