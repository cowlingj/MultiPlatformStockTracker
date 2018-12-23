/** @format */

export default interface Observer<M> {
  onMessage(message: M): void
}
