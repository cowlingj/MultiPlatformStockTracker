/** @format */

import Observer from "./Observer"

export default class Observable<M> {
  private observers: Array<Observer<M> | null>

  constructor() {
    this.observers = new Array()
  }

  public unsubscribe(i: number) {
    if (this.observers[i] !== null) {
      throw new Error("No observer is subscribed")
    }

    this.observers[i] = null
  }

  public subscribe(observer: Observer<M>): number {
    const possibleNullObserverIndex = this.observers.findIndex(
      val => val === null
    )

    if (possibleNullObserverIndex === -1) {
      return this.observers.push(observer)
    }

    this.observers[possibleNullObserverIndex] = observer
    return possibleNullObserverIndex
  }

  public notify(message: M) {
    this.observers.forEach(ob => {
      if (ob !== null) {
        ob.onMessage(message)
      }
    })
  }
}
