/** @format */

import Observer from "../observer/Observer"

export interface StockListState {
  items: Array<{
    id: number
    name: string
    quantity: number
  }>
}

export interface Store<T> {
  apply(setState: (state: StockListState) => void): Observer<T>
}
