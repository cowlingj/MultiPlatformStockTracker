/** @format */

import { AddItem, Update, Init } from "../Messages"
import Dispatcher from "."
import Observable from "../../../archetecture/observer/Observable"
import Observer from "../../../archetecture/observer/Observer"

export default class DispatcherFactory {
  private add = new Observable<AddItem>()
  private update = new Observable<Update>()
  private init = new Observable<Init>()

  public subcribeAdd(subscriber: Observer<AddItem>): number {
    return this.add.subscribe(subscriber)
  }
  public subscribeUpdate(subscriber: Observer<Update>): number {
    return this.update.subscribe(subscriber)
  }
  public subscribeInit(subscriber: Observer<Init>): number {
    return this.init.subscribe(subscriber)
  }
  public create(): Dispatcher {
    return new Dispatcher(this.add, this.update, this.init)
  }
}
