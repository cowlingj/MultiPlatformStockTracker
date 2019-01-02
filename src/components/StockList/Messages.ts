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

export interface AddItem {
  name: string
  quantity: number
}

export interface HighLight {
  id: number
  isHighlighted: boolean
}

export interface Init {}
