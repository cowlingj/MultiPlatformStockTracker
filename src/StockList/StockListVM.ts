import { Increment, Decrement } from "./Message";
import Observable from "../mvvm/Observable";
import Observer from "../mvvm/Observer";

export default class StockListVM {
  
  private incrementOb = new Observable<Increment>()
  private decrementOb = new Observable<Decrement>()

  constructor(incrementObserver?: Observer<Increment>,
              decrementObserver?: Observer<Decrement>) {

    if (decrementObserver !== undefined) {
      this.decrementOb.subscribe(decrementObserver)
    }
    
    if (incrementObserver !== undefined) {
      this.incrementOb.subscribe(incrementObserver)
    }
  }

  public inc(name: string, value: number): void {
    this.incrementOb.notify({
      name,
      value: value + 1
    })
  }

  public dec(name: string, value: number): void {
    this.decrementOb.notify({
      name,
      value: value - 1
    })
  }
}