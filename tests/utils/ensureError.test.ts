import * as tsf from "../../src";
import { testPage } from "../tester"

testPage({
  title: "Ensure Error",
  tests: [
    {
      type: "normal",
      title: "Ensure we have have the same error when an error occurs",
      expect: () => {
        const result = tsf.ensureError(new Error("Something went wrong"))
        return result.message
      },
      equal: "Something went wrong",
    },
    {
      type: "normal",
      title: "Ensure we still have the same error when an error occurs when the default error message is overrwriten",
      expect: () => {
        const result = tsf.ensureError(new Error("Something went wrong"), "An error has occured")
        return result.message
      },
      equal: "Something went wrong",
    },
    {
      type: "normal",
      title: "Ensure we have an error when the value isn't an error",
      expect: () => {
        const result = tsf.ensureError(123)
        return result.message
      },
      equal: "Unknown Error: 123",
    },
    {
      type: "normal",
      title: "Ensure we have an error when the value isn't an error with an overrwiten message",
      expect: () => {
        const result = tsf.ensureError(123, "An error has occured")
        return result.message
      },
      equal: "An error has occured",
    }
  ]
})
