/** @format */

import renderer from "react-test-renderer"
import React from "react"
import App from "../src/App";

test("app matches snapshot", () => {
  expect(renderer.create(<App />)).toMatchSnapshot()
})
