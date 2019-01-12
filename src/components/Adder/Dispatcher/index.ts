/** @format */

import { AddItem, Update, Init } from "../Messages"
import Observable from "../../../archetecture/observer/Observable"

export default class Dispatcher {
  private addMessenger: Observable<AddItem>
  private updateMessenger: Observable<Update>
  private initMessenger: Observable<Init>;

  constructor(
    addMessenger: Observable<AddItem>,
    updateMessenger: Observable<Update>,
    initMessenger: Observable<Init>
  ) {
    this.addMessenger = addMessenger
    this.updateMessenger = updateMessenger
    this.initMessenger = initMessenger
  }

  public add(name: string, quantity: number = 1) {
    if (name === "") {
      // TODO: invalidItemMessenger.notify({ reason: string })
      return
    }
    this.addMessenger.notify({ name, quantity })
  }

  public update(name: string) {
    this.updateMessenger.notify({ name })
  }

  public init() {
    this.initMessenger.notify({})
  }
}
