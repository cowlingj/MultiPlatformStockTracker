/** @format */

import Subscribable from "./observer/Subscribable";

export class Store<M, S> {
  private mapper: Mapper<M, S>
  private subscribable: Subscribable<M>
  
  constructor(mapper: Mapper<M, S>, subscribable: Subscribable<M>) {
    this.mapper = mapper
    this.subscribable = subscribable
  }

  public apply(setState: (state: S) => void): number {
    const self = this
    return this.subscribable.subscribe({
      onMessage(message: M): void {
        setState(self.mapper.map(message))
      },
    })
  }
}

export interface Mapper<T, S> {
  map(message: T): S
}
