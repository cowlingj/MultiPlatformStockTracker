/** @format */

import { Increment, Decrement, RemoveItem, Init, HighLight } from "../Messages"
import Observable from "../../../archetecture/observer/Observable"

export default class Dispatcher {
  private incrementMessenger = new Observable<Increment>()
  private decrementMessenger = new Observable<Decrement>()
  private delItemMessenger = new Observable<RemoveItem>()
  private highlightMessenger: Observable<HighLight>

  constructor(
    incrementMessenger: Observable<Increment>,
    decrementMessenger: Observable<Decrement>,
    delItemMessenger: Observable<RemoveItem>,
    highLightMessenger: Observable<HighLight>,
    initMessenger: Observable<Init>
  ) {
    this.incrementMessenger = incrementMessenger
    this.decrementMessenger = decrementMessenger
    this.delItemMessenger = delItemMessenger
    this.highlightMessenger = highLightMessenger

    initMessenger.notify({})
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

  public del(id: number): void {
    this.delItemMessenger.notify({ id })
  }

  public makeHighlighted(id: number): void {
    this.highlightMessenger.notify({ id, isHighlighted: true })
  }

  public makeUnhighlighted(id: number): void {
    this.highlightMessenger.notify({ id, isHighlighted: false })
  }
}
