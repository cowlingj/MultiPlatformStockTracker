/** @format */

export interface Increment {
  id: number
  quantity: number
}

export interface Decrement {
  id: number
  quantity: number
}

export interface RemoveItem {
  id: number
}

export interface Highlight {
  id: number
  isHighlighted: boolean
}