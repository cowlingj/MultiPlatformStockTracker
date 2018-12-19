import StockListV from './StockList/View'
import { QuantChanged, ItemAdded, ItemDeleted, InitView } from './StockList/ItemStateStores'
import * as React from 'react'

export default () => <StockListV
  inc={new QuantChanged()}
  dec={new QuantChanged()}
  add={new ItemAdded()}
  del={new ItemDeleted()}
  init={new InitView()}
/>