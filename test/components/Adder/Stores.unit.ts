/** @format */

import * as Stores from "../../../src/components/Adder/Store"
import chai from "chai"
import sinon from "sinon"

const should = chai.should()

describe("Adder Stores", () => {
  describe("initView", () => {
    it("should create an observer that responds with the initial state", () => {
      const callback = sinon.stub()
      const expected = { name: "" }

      Stores.initView()
        .apply(callback)
        .onMessage({})

      sinon.assert.callCount(callback, 1)
      sinon.assert.calledWithExactly(callback.getCall(0), expected)
    })
  })
  describe("itemAdded", () => {
    it("should set name to an empty string", () => {
      const callback = sinon.stub()
      const msg = { name: "name", quantity: 0 }
      const expected = { name: "" }

      Stores.itemAdded()
        .apply(callback)
        .onMessage(msg)

      sinon.assert.callCount(callback, 1)
      sinon.assert.calledWithExactly(callback.getCall(0), expected)
    })
  })
  describe("update", () => {
    it("should set the state with the new name", () => {
      const callback = sinon.stub()

      const newName = "updated string"
      const msg = { name: newName }
      const expected = { name: newName }

      Stores.update()
        .apply(callback)
        .onMessage(msg)

      sinon.assert.callCount(callback, 1)
      sinon.assert.calledWithExactly(callback.getCall(0), expected)
    })
  })
})
