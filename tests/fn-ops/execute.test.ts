import * as tsf from "../../src";
import { testPage } from "../tester"

testPage({
  title: "Execute",
  tests: [
    {
      type: "normal",
      title: "Execute a function and returns back a Result",
      expect: () => tsf.execute((value: number) => value * value, 20),
      equal: { success: true, value: 400},
    },
    {
      type: "normal",
      title: "Execute a function and returns back an Error without application crash",
      expect: () => {
        const execd = tsf.execute((value: number) => {
          if(value == 20) {
            throw new Error("This is crazy I know, but follow through")
          }
          return value * value
        }, 20)
        if(execd.success) {
          return "This is bs honestly..."
        } else {
          return execd.error.message
        }
      },
      equal: "This is crazy I know, but follow through",
    },
    {
      type: "normal",
      title: "Match the result of an execute function and handle the error to get a value back or still an error",
      expect: () => {
        const execd = tsf.execute((value: number) => {
          if(value == 20) {
            throw new Error("Give back an error please")
          }
          return value * value
        }, 20)
        const result = tsf.matchExecute(execd, {
          ERROR: (_) => 0
        })
        return result
      },
      equal: 0,
    },
    {
      type: "normal",
      title: "We can ignore handling the error and get it back later",
      expect: () => {
        const execd = tsf.execute((value: number) => {
          if(value == 20) {
            throw new Error("Give back an error please")
          }
          return value * value
        }, 20)
        const result = tsf.matchExecute(execd, {
          SUCCESS: (value) => value * 3
        })
        return typeof result === "number" ? result : result.message
      },
      equal: "Give back an error please",
    },
    {
      type: "normal",
      title: "We can safely execute on a result for more handling of the value",
      expect: () => {
        const execd = tsf.execute((value: number) => {
          return value * value
        }, 20)
        const safeExec = tsf.safeExecute((value: number) => value / 100, execd)
        const result = tsf.matchExecute(safeExec, {
          ERROR: (_) => 0
        })
        return result
      },
      equal: 4,
    }
  ]
})
