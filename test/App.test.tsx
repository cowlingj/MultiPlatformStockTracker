import renderer from 'react-test-renderer'
import App from '../src/App'
import React from 'react'

test("app matches snapshot", ()=>{
  expect(renderer.create(<App />)).toMatchSnapshot()
})