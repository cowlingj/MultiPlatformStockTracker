/** @format */

import { AddItem, Update, Init } from "../Messages"
import Dispatcher from "./Dispatcher"
import Observable from "../../../archetecture/observer/Observable"
import Observer from "../../../archetecture/observer/Observer"

export class DispatcherFactory {
  private add: Observable<AddItem>
  private update: Observable<Update>
  private init: Observable<Init>

  constructor(
    add: Observable<AddItem>,
    update: Observable<Update>,
    init: Observable<Init>
  ) {
    this.add = add
    this.update = update
    this.init = init
  }
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
