/** @format */

// TODO: move to index

export interface StockListItem {
  id: number
  name: string
  quantity: number
  isHighlighted: boolean
}

export interface StockListState {
  items: StockListItem[]
}
