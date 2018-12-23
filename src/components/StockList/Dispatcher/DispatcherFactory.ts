/** @format */

import { Increment, Decrement, RemoveItem, Init } from "../Messages"
import Dispatcher from "."
import Observable from "../../../archetecture/observer/Observable"
import Observer from "../../../archetecture/observer/Observer"

export default class DispatcherFactory {
  private inc: Observable<Increment>
  private dec: Observable<Decrement>
  private del: Observable<RemoveItem>
  private init: Observable<Init>
  constructor(
    inc: Observable<Increment>,
    dec: Observable<Decrement>,
    del: Observable<RemoveItem>,
    init: Observable<Init>
  ) {
    this.inc = inc
    this.dec = dec
    this.del = del
    this.init = init
  }
  public subscribeInc(subscriber: Observer<Increment>): number {
    return this.inc.subscribe(subscriber)
  }
  public subscribeDec(subscriber: Observer<Decrement>): number {
    return this.dec.subscribe(subscriber)
  }
  public subscribeDel(subscriber: Observer<RemoveItem>): number {
    return this.del.subscribe(subscriber)
  }
  public subscribeInit(subscriber: Observer<Init>): number {
    return this.init.subscribe(subscriber)
  }
  public create(): Dispatcher {
    return new Dispatcher(this.inc, this.dec, this.del, this.init)
  }
}
