/** @format */

import renderer from "react-test-renderer"
import App from "../src/StockList/StockListV"
import React from "react"

test("app matches snapshot", () => {
  expect(renderer.create(<App />)).toMatchSnapshot()
})
