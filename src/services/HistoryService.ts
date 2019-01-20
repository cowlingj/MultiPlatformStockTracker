import { History } from "history";

export default class HistoryService {

  private history: History
  private historyStack: string[] = []

  constructor(history: History) {
    this.history = history
    this.historyStack.push(history.location.pathname)
  }

  navigate(to: string) {
    this.historyStack.push(to)
    this.history.push(to)
  }
  goBack() {
    this.historyStack.pop()
    this.history.goBack()
  }
  goBackTo(path: string) {
    const possibleIndex = this.historyStack.lastIndexOf(path)

    if (possibleIndex == -1) {
      this.historyStack = this.historyStack.slice(0, 1)
    } else {
      this.historyStack.splice(possibleIndex)
    }

    this.history.go(this.historyStack.length - this.history.length)
  }
}