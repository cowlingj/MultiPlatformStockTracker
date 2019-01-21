/** @format */

import { DataItem } from "../../services/StockListStateService"

import { StockListState } from "./model"

export function map(data: { items: DataItem[] }): StockListState {
  return {
    items: data.items
      .filter(item => item.inUse)
      .map(({ inUse, ...item }) => item),
  }
}
