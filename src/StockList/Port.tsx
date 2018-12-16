import { ItemState } from "./View"
import Observer from "../mvvm/Observer";

export interface Port<T> {
  apply(getState: () => ItemState, setState: (state: ItemState) => void): Observer<T>
}