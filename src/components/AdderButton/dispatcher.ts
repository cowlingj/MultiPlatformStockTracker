/** @format */

import HistoryService from "../../services/HistoryService";

export default class Dispatcher {
  private history: HistoryService;

  constructor(
    history: HistoryService
  ) {
    this.history = history
  }

  public add() {
    this.history.navigate("/add")
  }
}
