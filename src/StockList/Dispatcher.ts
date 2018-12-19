/** @format */

import { Increment, Decrement, AddItem, RemoveItem, Init } from "./Messages"
import Observable from "../observer/Observable"
import Observer from "../observer/Observer"

export default class {
  private incrementMessenger = new Observable<Increment>()
  private decrementMessenger = new Observable<Decrement>()
  private addItemMessenger = new Observable<AddItem>()
  private delItemMessenger = new Observable<RemoveItem>()

  constructor(
    incrementListener: Observer<Increment>,
    decrementListener: Observer<Decrement>,
    addItemListener: Observer<AddItem>,
    delItemListener: Observer<RemoveItem>,
    initListener: Observer<Init>
  ) {
    this.decrementMessenger.subscribe(decrementListener)
    this.incrementMessenger.subscribe(incrementListener)
    this.addItemMessenger.subscribe(addItemListener)
    this.delItemMessenger.subscribe(delItemListener)
    
    const init = new Observable<Init>()
    init.subscribe(initListener)
    init.notify({})
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

  public add(name: string, quantity: number = 0): void {
    this.addItemMessenger.notify({ name, quantity })
  }

  public del(id: number): void {
    this.delItemMessenger.notify({ id })
  }
}
