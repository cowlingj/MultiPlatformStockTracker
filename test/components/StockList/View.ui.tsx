/** @format */

import StockList from "../../../src/components/StockList"
import Sinon from "sinon"
import React from "react"
import { shallow } from "enzyme"
import { StockListState } from "../../../src/components/StockList/model"
import { Store } from "../../../src/archetecture/Store"
import DispatcherFactory from "../../../src/components/StockList/Dispatcher/DispatcherFactory"
import Dispatcher from "../../../src/components/StockList/dispatcher"

describe("StockList", () => {
  it("should render", () => {
    let initFn: (state: StockListState) => void

    shallow(
      <StockList
        {...{
          dispatcherFactory: Sinon.createStubInstance(DispatcherFactory, {
            create: Sinon.stub().callsFake(
              (): Dispatcher => {
                initFn({ items: [] })
                return Sinon.createStubInstance(Dispatcher)
              }
            ),
          }),
          inc: Sinon.createStubInstance(Store),
          dec: Sinon.createStubInstance(Store),
          add: Sinon.createStubInstance(Store),
          del: Sinon.createStubInstance(Store),
          init: Sinon.createStubInstance(Store, {
            apply: Sinon.stub().callsFake(
              (f: (state: StockListState) => void) => {
                initFn = f
              }
            ),
          }),
        }}
      />
    )
  })
})
