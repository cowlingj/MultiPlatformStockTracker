/** @format */

import React from "react"
import Adder from "../../../src/components/Adder"
import DispatcherFactory from "../../../src/components/Adder/Dispatcher/DispatcherFactory"
import { shallow } from "enzyme"
import { Store } from "../../../src/archetecture/Store"
import Sinon from "sinon"
import Dispatcher from "../../../src/components/Adder/Dispatcher"
import { AddState } from "../../../src/components/Adder/Store"

describe("adder", () => {
  it("should render", () => {
    let initFn: (state: AddState) => void
    shallow(
      <Adder
        {...{
          dispatcherFactory: Sinon.createStubInstance(DispatcherFactory, {
            create: Sinon.stub().callsFake(
              (): Dispatcher => {
                initFn({ name: "TEST" })
                return Sinon.createStubInstance(Dispatcher)
              }
            ),
          }),
          add: Sinon.createStubInstance(Store),
          update: Sinon.createStubInstance(Store),
          init: Sinon.createStubInstance(Store, {
            apply: Sinon.stub().callsFake((f: (state: AddState) => void) => {
              initFn = f
            }),
          }),
        }}
      />
    )
  })
})
