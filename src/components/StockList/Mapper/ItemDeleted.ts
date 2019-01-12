/** @format */

import { Mapper } from "../../../archetecture/Store"
import { RemoveItem } from "../Messages"
import { StockListState, DataModel, itemsToDisplay } from "../Model"
import IllegalOperationError from "../../../util/error/IllegalOperationError"
import IllegalStateError from "../../../util/error/IllegalStateError"
export default class implements Mapper<RemoveItem, StockListState> {
  private model: DataModel
  constructor(model: DataModel) {
    this.model = model
  }
  public map(message: RemoveItem) {
    const singletonArrayToDelete = this.model.state.items.filter(
      item => item.id === message.id
    )

    if (singletonArrayToDelete.length < 1) {
      throw new IllegalOperationError("no matching ids")
    }

    if (singletonArrayToDelete.length > 1) {
      throw new IllegalStateError("multiple matching ids")
    }

    if (!singletonArrayToDelete[0].inUse) {
      throw new IllegalOperationError(
        "trying to update an item that's not in use"
      )
    }

    singletonArrayToDelete[0].inUse = false

    return itemsToDisplay(this.model.state)
  }
}
