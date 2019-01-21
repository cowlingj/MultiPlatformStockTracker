/** @format */

export interface AddItem {
  name: string
  quantity: number
}

export interface NameChange {
  name: string
}

export interface QuantityChange {
  quantity: number | null
}

export interface Init {}
