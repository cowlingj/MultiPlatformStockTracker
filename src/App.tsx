import StockListV from './StockList/View'
import { QuantChanged as QuantChangedAdapter, ItemAddedAdapter, ItemDeletedAdapter } from './StockList/Adapter'

export default () => <StockListV
  inc={new QuantChangedAdapter()}
  dec={new QuantChangedAdapter()}
  add={new ItemAddedAdapter()}
  del={new ItemDeletedAdapter()}
/>