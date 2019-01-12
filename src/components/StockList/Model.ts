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

export interface DataItem extends StockListItem {
  id: number
  name: string
  quantity: number
  inUse: boolean
}

export interface DataModel {
  state: { items: DataItem[] }
}

export function itemsToDisplay(data: { items: DataItem[] }): StockListState {
  return {
    items: data.items
      .filter(item => item.inUse)
      .map(({ inUse, ...item }) => item),
  }
}
