import * as tsf from "../../src";
import { testPage } from "../tester"

testPage({
  title: "Assert",
  tests: [
    {
      type: "normal",
      title: "Assert that a value is defined",
      expect: () => {
        tsf.assertDefined({})
        return true
      },
      equal: true,
    },
    {
      type: "normal",
      title: "Throw an error if the value is either undefined or null",
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
      title: "Test if two types are the same",
      expect: () => {
        return tsf.assertType<{
          a: number
        }, {
          a: number
        }>(true)
      },
      equal: true,
    },
    {
      type: "normal",
      title: "Throw an error if two types are differents",
      expect: () => {
        try {
          tsf.assertType<{
            a: number
          }, {
            b: number
          }>(false)
        } catch(e) {
          return true
        }
        return false
      },
      equal: true,
    }
  ]
})
