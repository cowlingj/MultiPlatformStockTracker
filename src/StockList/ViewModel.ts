/** @format */

import { Increment, Decrement, AddItem } from "./Message"
import Observable from "../mvvm/Observable"
import Observer from "../mvvm/Observer"

export default class StockListVM {
  private incrementMessenger = new Observable<Increment>()
  private decrementMessenger = new Observable<Decrement>()
  private addItemMessenger = new Observable<AddItem>()

  constructor(
    incrementListener: Observer<Increment>,
    decrementListener: Observer<Decrement>,
    addItemListener: Observer<AddItem>
  ) {
      this.decrementMessenger.subscribe(decrementListener)
      this.incrementMessenger.subscribe(incrementListener)
      this.addItemMessenger.subscribe(addItemListener)
  }

  public inc(id: number, quantity: number): void {
    this.incrementMessenger.notify({
      id,
      quantity: quantity + 1,
    })
  }

  public dec(id: number, quantity: number): void {
    this.decrementMessenger.notify({
      id,
      quantity: quantity - 1,
    })
  }

  public add(name: string, quantity: number = 0 ): void {
    this.addItemMessenger.notify({ name, quantity })
  }

  public del(/*id: number*/): void {
    // TODO
  }
}
