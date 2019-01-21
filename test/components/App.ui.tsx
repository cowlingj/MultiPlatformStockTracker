/** @format */

import * as React from "react"
import App from "../../src/App"
import { shallow } from "enzyme"

describe("app", () => {
  it("should render", () => {
    shallow(<App />)
  })
})
