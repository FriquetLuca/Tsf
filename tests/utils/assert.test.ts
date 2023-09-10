import * as tsf from "../../src";
import { testPage } from "../tester"

testPage({
  title: "Assert",
  tests: [
    {
      type: "normal",
      title: "Any asserts used won't throw an error for an existing data",
      expect: () => {
        tsf.assertDefined({})
        tsf.assertExist({})
        tsf.assertNull({})
        return true
      },
      equal: true,
    },
    {
      type: "normal",
      title: "AssertDefined > Throw an error if the value is undefined",
      expect: () => {
        try {
          tsf.assertDefined(undefined)
        } catch(e) {
          return true
        }
        return false
      },
      equal: true,
    },
    {
      type: "normal",
      title: "AssertNull > Throw an error if the value is null",
      expect: () => {
        try {
          tsf.assertNull(null)
        } catch(e) {
          return true
        }
        return false
      },
      equal: true,
    },
    {
      type: "normal",
      title: "AssertExist > Throw an error if the value is undefined",
      expect: () => {
        try {
          tsf.assertExist(undefined)
        } catch(e) {
          return true
        }
        return false
      },
      equal: true,
    },
    {
      type: "normal",
      title: "AssertExist > Throw an error if the value is null",
      expect: () => {
        try {
          tsf.assertExist(null)
        } catch(e) {
          return true
        }
        return false
      },
      equal: true,
    }
  ]
})
