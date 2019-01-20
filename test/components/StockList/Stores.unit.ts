/** @format */

import * as Store from "../../../src/components/StockList/Store"
import sinon from "sinon"
import { StockListState } from "../../../src/components/StockList/model"
import chai from "chai"
import IllegalOperationError from "../../../src/util/error/IllegalOperationError"
import IllegalStateError from "../../../src/util/error/IllegalStateError"

const should = chai.should()

describe("StockList Stores", () => {
  describe("itemAdded", () => {
    describe("should update the state to include the item", () => {
      it("when initial state is an empty list", () => {
        const items: Store.DataItem[] = []

        const expected: StockListState = {
          items: [
            {
              id: 0,
              name: "item",
              quantity: 2,
            },
          ],
        }

        const state = { items }

        const callback = sinon.stub()

        Store.itemAdded({ state })
          .apply(callback)
          .onMessage({
            name: "item",
            quantity: 2,
          })

        sinon.assert.callCount(callback, 1)
        sinon.assert.calledWithExactly(callback.getCall(0), expected)
      })
      it("when initial state is a non empty list", () => {
        const model: Store.DataModel = {
          state: {
            items: [
              {
                id: 0,
                name: "hidden",
                quantity: 0,
                inUse: false,
              },
              {
                id: 1,
                name: "visible",
                quantity: 0,
                inUse: true,
              },
            ],
          },
        }

        const expected: StockListState = {
          items: [
            {
              id: 0,
              name: "item",
              quantity: 2,
            },
            {
              id: 1,
              name: "visible",
              quantity: 0,
            },
          ],
        }

        const callback = sinon.stub()

        Store.itemAdded(model)
          .apply(callback)
          .onMessage({
            name: "item",
            quantity: 2,
          })

        sinon.assert.callCount(callback, 1)
        sinon.assert.calledWithExactly(callback.getCall(0), expected)
      })
      it("when quantChanged called first", () => {
        const model: Store.DataModel = {
          state: {
            items: [
              {
                id: 0,
                name: "hidden",
                quantity: 0,
                inUse: false,
              },
              {
                id: 1,
                name: "visible",
                quantity: 0,
                inUse: true,
              },
            ],
          },
        }

        const expected0: StockListState = {
          items: [
            {
              id: 1,
              name: "visible",
              quantity: 10,
            },
          ],
        }

        const expected1: StockListState = {
          items: [
            {
              id: 0,
              name: "item",
              quantity: 2,
            },
            {
              id: 1,
              name: "visible",
              quantity: 10,
            },
          ],
        }

        const callback = sinon.stub()

        Store.quantChanged(model)
          .apply(callback)
          .onMessage({ id: 1, quantity: 10 })

        Store.itemAdded(model)
          .apply(callback)
          .onMessage({
            name: "item",
            quantity: 2,
          })

        sinon.assert.callCount(callback, 2)
        sinon.assert.calledWithExactly(callback.getCall(0), expected0)
        sinon.assert.calledWithExactly(callback.getCall(1), expected1)
      })
    })
  })
  describe("itemDeleted", () => {
    it("should flag the correct item deleted", () => {
      const model: Store.DataModel = {
        state: {
          items: [
            {
              id: 0,
              name: "hidden",
              quantity: 0,
              inUse: false,
            },
            {
              id: 1,
              name: "visible",
              quantity: 0,
              inUse: true,
            },
          ],
        },
      }

      const expected: StockListState = {
        items: [],
      }

      const callback = sinon.stub()

      Store.itemDeleted(model)
        .apply(callback)
        .onMessage({
          id: 1,
        })

      sinon.assert.callCount(callback, 1)
      sinon.assert.calledWithExactly(callback.getCall(0), expected)
    })
    it("should throw an exception if given id is invalid", () => {
      const model: Store.DataModel = {
        state: {
          items: [
            {
              id: 0,
              name: "hidden",
              quantity: 0,
              inUse: false,
            },
            {
              id: 1,
              name: "visible",
              quantity: 0,
              inUse: true,
            },
          ],
        },
      }

      const callback = sinon.stub()

      should.Throw(
        () =>
          Store.itemDeleted(model)
            .apply(callback)
            .onMessage({
              id: 0,
            }),
        IllegalOperationError
      )

      sinon.assert.callCount(callback, 0)
    })
  })
  describe("quantChanged", () => {
    it("should update the correct item", () => {
      const model: Store.DataModel = {
        state: {
          items: [
            {
              id: 0,
              name: "hidden",
              quantity: 0,
              inUse: false,
            },
            {
              id: 1,
              name: "visible",
              quantity: 0,
              inUse: true,
            },
          ],
        },
      }

      const expected: StockListState = {
        items: [
          {
            id: 1,
            name: "visible",
            quantity: -1,
          },
        ],
      }

      const callback = sinon.stub()

      Store.quantChanged(model)
        .apply(callback)
        .onMessage({
          id: 1,
          quantity: -1,
        })

      sinon.assert.callCount(callback, 1)
      sinon.assert.calledWithExactly(callback.getCall(0), expected)
    })
    it("should throw an exception if given an invalid item id", () => {
      const model: Store.DataModel = {
        state: {
          items: [
            {
              id: 0,
              name: "hidden",
              quantity: 0,
              inUse: false,
            },
            {
              id: 1,
              name: "visible",
              quantity: 0,
              inUse: true,
            },
          ],
        },
      }

      const callback = sinon.stub()

      should.Throw(
        () =>
          Store.quantChanged(model)
            .apply(callback)
            .onMessage({ id: 0, quantity: 0 }),
        IllegalOperationError
      )

      should.Throw(
        () =>
          Store.quantChanged(model)
            .apply(callback)
            .onMessage({ id: 2, quantity: 0 }),
        IllegalOperationError
      )

      sinon.assert.callCount(callback, 0)
    })
    it("should throw an exception if given id matches multiple items", () => {
      const model: Store.DataModel = {
        state: {
          items: [
            {
              id: 0,
              name: "hidden",
              quantity: 0,
              inUse: false,
            },
            {
              id: 0,
              name: "visible",
              quantity: 0,
              inUse: true,
            },
          ],
        },
      }

      const callback = sinon.stub()

      should.Throw(
        () =>
          Store.quantChanged(model)
            .apply(callback)
            .onMessage({ id: 0, quantity: 0 }),
        IllegalStateError
      )

      sinon.assert.callCount(callback, 0)
    })
  })
  describe("initView", () => {
    it("should set the initial state", () => {
      const model: Store.DataModel = {
        state: {
          items: [
            {
              id: 0,
              name: "hidden",
              quantity: 0,
              inUse: false,
            },
            {
              id: 1,
              name: "visible",
              quantity: 0,
              inUse: true,
            },
          ],
        },
      }

      const expected: StockListState = {
        items: [
          {
            id: 1,
            name: "visible",
            quantity: 0,
          },
        ],
      }

      const callback = sinon.stub()

      Store.initView(model)
        .apply(callback)
        .onMessage({})

      sinon.assert.callCount(callback, 1)
      sinon.assert.calledWithExactly(callback.getCall(0), expected)
    })
  })
  describe("itemsToDisplay", () => {
    it("should filter out all items not in use", () => {
      const expected = {
        id: 1,
        name: "visible",
        quantity: 0,
      }

      Store.itemsToDisplay({
        items: [
          {
            id: 0,
            name: "hidden",
            quantity: 0,
            inUse: false,
          },
          {
            id: 1,
            name: "visible",
            quantity: 0,
            inUse: true,
          },
        ],
      })
        .should.have.property("items")
        .with.length(1)
        .and.have.deep.ordered.members([expected])
    })
  })
})
