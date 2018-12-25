/** @format */

const Adapter = require("enzyme-adapter-react-16")

require("enzyme").configure({ adapter: new Adapter() })

require("chai").config.showDiff = true
