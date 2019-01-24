/** @format */

import { State } from "../components/Adder"
import { QuantityChange, NameChange } from "../components/Adder/messages"

export class AdderStateService {
  private state: State
  private initial: State

  constructor(initial: State) {
    this.initial = initial
    this.state = initial
  }

  public get(): State {
    return this.state
  }

  public async clearQuantity(): Promise<State> {
    this.state = Object.assign({}, this.state, { quantity: "" })
    return this.state
  }

  public async itemAdded(): Promise<State> {
    this.state = this.initial
    return this.state
  }

  public async quantChanged(item: QuantityChange): Promise<State> {
    this.state = Object.assign({}, this.state, { quantity: item.quantity })
    return this.state
  }

  public async nameChanged(item: NameChange): Promise<State> {
    this.state = Object.assign({}, this.state, { name: item.name })
    return this.state
  }
}
