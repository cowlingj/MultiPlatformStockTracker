/** @format */

import { AddItem, Init, Update } from "../Messages"
import { Store } from "../../../archetecture/Store"

export interface AddState {
  name: string
}

export function itemAdded(): Store<AddItem, AddState> {
  return new Store<AddItem, AddState>({
    map() {
      return { name: "" }
    },
  })
}

export function update(): Store<Update, AddState> {
  return new Store<Update, AddState>({
    map(message: Update) {
      return { name: message.name }
    },
  })
}

export function initView(): Store<Init, AddState> {
  return new Store<Init, AddState>({
    map() {
      return { name: "" }
    },
  })
}
