/** @format */

export interface StockListItem {
  id: number
  name: string
  quantity: number
  isHighlited: boolean
}

export interface StockListState {
  items: StockListItem[]
}
