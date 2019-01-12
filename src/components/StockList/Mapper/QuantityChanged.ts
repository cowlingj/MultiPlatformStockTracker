/** @format */

import { Mapper } from "../../../archetecture/Store"
import { Increment, Decrement } from "../Messages"
import { StockListState, DataModel, itemsToDisplay } from "../Model"
import IllegalOperationError from "../../../util/error/IllegalOperationError"
import IllegalStateError from "../../../util/error/IllegalStateError"

export default class implements Mapper<Increment | Decrement, StockListState> {
  private model: DataModel
  constructor(model: DataModel) {
    this.model = model
  }
  public map(message: Increment | Decrement): StockListState {
    const singletonArrayToUpdate = this.model.state.items.filter(
      item => item.id === message.id
    )

    if (singletonArrayToUpdate.length < 1) {
      throw new IllegalOperationError("no matching ids")
    }

    if (singletonArrayToUpdate.length > 1) {
      throw new IllegalStateError("multiple matching ids")
    }

    if (!singletonArrayToUpdate[0].inUse) {
      throw new IllegalOperationError(
        "trying to update an item that's not in use"
      )
    }

    singletonArrayToUpdate[0].quantity = message.quantity

    return itemsToDisplay(this.model.state)
  }
}
