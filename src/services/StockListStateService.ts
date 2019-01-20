import { AddItem } from "../components/Adder/messages";
import { RemoveItem, Highlight, Increment, Decrement } from "../components/StockList/messages";
import IllegalStateError from "../util/error/IllegalStateError";
import IllegalOperationError from "../util/error/IllegalOperationError";

export interface DataModel {
  items: DataItem[]
  isHighlightedDefault: boolean
}

export interface DataItem {
  id: number
  name: string
  quantity: number
  inUse: boolean
  isHighlighted: boolean
}

export class StockListStateService {
  
  private state: DataModel;

  constructor(initialState: DataModel) {
    this.state = initialState
  }
  
  public async addItem(itemToAdd: AddItem): Promise<DataModel> { 
      const possibleIndex = this.state.items.findIndex(item => !item.inUse)
      let removed: DataItem[] = []
      if (possibleIndex !== -1) {
        removed = this.state.items.splice(possibleIndex, 1)
      }
      this.state.items.unshift({
        id: removed.length > 0 ? removed[0].id : this.state.items.length,
        name: itemToAdd.name,
        quantity: itemToAdd.quantity,
        isHighlighted: this.state.isHighlightedDefault,
        inUse: true,
      })
      return this.state
  }

  private checkAndSendErrors(singletonArray: DataItem[]) {

    if (singletonArray.length < 1) {
      throw new IllegalOperationError()
    }

    if (singletonArray.length > 1) {
      throw new IllegalStateError()
    }

    if (!singletonArray[0].inUse) {
      throw new IllegalOperationError()
    }
  }

  public async removeItem(itemToRemove: RemoveItem): Promise<DataModel> {
    const singletonArrayToUpdate = this.state.items.filter(
      item => item.id === itemToRemove.id
    )

    this.checkAndSendErrors(singletonArrayToUpdate)

    singletonArrayToUpdate[0].inUse = false
    return this.state
  }

  public async highlightItem(itemToHighlight: Highlight): Promise<DataModel> {
    const singletonArrayToUpdate = this.state.items.filter(
      item => item.id === itemToHighlight.id
    )

    this.checkAndSendErrors(singletonArrayToUpdate)

    singletonArrayToUpdate[0].isHighlighted = itemToHighlight.isHighlighted
    return this.state
  }

  public async quantChange(itemToUpdate: Increment | Decrement): Promise<DataModel> {
    const singletonArrayToUpdate = this.state.items.filter(
      item => item.id === itemToUpdate.id
    )

    this.checkAndSendErrors(singletonArrayToUpdate)

    singletonArrayToUpdate[0].quantity = itemToUpdate.quantity
    return this.state
  }

  public async get(): Promise<DataModel> {
    return this.state
  }
}
