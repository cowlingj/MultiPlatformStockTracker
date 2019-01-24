/** @format */

import Observable from "../../archetecture/observer/Observable"
import {
  StockListStateService,
  DataModel,
} from "../../services/StockListStateService"
import { StockListState } from "./model";

export default class Dispatcher {
  private stockListStateService: StockListStateService
  private stockListObservable: Observable<DataModel>

  constructor(
    stockListStateService: StockListStateService,
    stockListObservable: Observable<DataModel>
  ) {
    this.stockListStateService = stockListStateService
    this.stockListObservable = stockListObservable
  }

  public inc(id: number, quantity: number): void {
    this.stockListStateService
      .quantChange({
        id,
        quantity: quantity + 1,
      })
      .then(this.stockListObservable.notify.bind(this.stockListObservable))
      .catch()
  }

  public dec(id: number, quantity: number): void {
    this.stockListStateService
      .quantChange({
        id,
        quantity: quantity - 1,
      })
      .then(this.stockListObservable.notify.bind(this.stockListObservable))
      .catch()
  }

  public del(id: number): void {
    this.stockListStateService
      .removeItem({
        id,
      })
      .then(this.stockListObservable.notify.bind(this.stockListObservable))
      .catch()
  }

  public init(): StockListState {
    return this.stockListStateService.get()
  }

  public makeHighlighted(id: number): void {
    this.stockListStateService
      .highlightItem({ id, isHighlighted: true })
      .then(this.stockListObservable.notify.bind(this.stockListObservable))
      .catch()
  }

  public makeUnhighlighted(id: number): void {
    this.stockListStateService
      .highlightItem({ id, isHighlighted: false })
      .then(this.stockListObservable.notify.bind(this.stockListObservable))
      .catch()
  }
}
