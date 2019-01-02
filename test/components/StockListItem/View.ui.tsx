/** @format */

import { shallow } from "enzyme"
import StockListItem from "../../../src/components/StockList/StockListItem"
import * as React from "react"

describe("StockListItem", () => {
  it("should render", () => {
    shallow(
      <StockListItem name='name' quantity={100} isHighlighted={() => true} />
    )
  })
})
