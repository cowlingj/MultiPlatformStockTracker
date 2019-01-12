import Observer from "./Observer";

export default interface Subscribable<M> {
  subscribe(observer: Observer<M>): number
  unsubscribe(i: number): void
}