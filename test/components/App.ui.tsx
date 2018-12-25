/** @format */

import * as React from "react"
import App from "../../src/App"
import { shallow } from "enzyme"

describe("app", function() {
  it("should render", function() {
    shallow(<App />)
  })
})
