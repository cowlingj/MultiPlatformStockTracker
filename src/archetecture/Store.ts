/** @format */

import Observer from "./observer/Observer"

export class Store<M, S> {
  private mapper: Mapper<M, S>
  constructor(mapper: Mapper<M, S>) {
    this.mapper = mapper
  }

  public apply(setState: (state: S) => void): Observer<M> {
    const outer = this
    return {
      onMessage(message: M): void {
        setState(outer.mapper.map(message))
      },
    }
  }
}

export interface Mapper<T, S> {
  map(message: T): S
}
