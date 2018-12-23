/** @format */

export interface StockListItem {
  id: number
  name: string
  quantity: number
}

export interface StockListState {
  items: StockListItem[]
}
