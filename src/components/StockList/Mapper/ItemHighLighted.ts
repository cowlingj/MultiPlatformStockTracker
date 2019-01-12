/** @format */

import { Highlight } from "../Messages"
import { StockListState, DataModel, itemsToDisplay } from "../Model"
import { Mapper } from "../../../archetecture/Store"
import IllegalOperationError from "../../../util/error/IllegalOperationError"
import IllegalStateError from "../../../util/error/IllegalStateError"

export default class implements Mapper<Highlight, StockListState> {
  model: DataModel

  constructor(model: DataModel) {
    this.model = model
  }

  map(message: Highlight): StockListState {
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
