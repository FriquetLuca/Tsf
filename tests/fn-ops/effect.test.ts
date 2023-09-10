import * as tsf from "../../src";
import { testPage } from "../tester"

const sensitiveFunction = (x: number) => {
  if(x == 1) {
    throw new Error("Divide by zero")
  }
  return x / (x - 1)
}

testPage({
  title: "Effect",
  tests: [
    {
      type: "normal",
      title: "Apply an effect on a function to handle unexpected errors",
      expect: () => {
        const computeEffect = tsf.effect(sensitiveFunction, {
          ERROR: (_) => {
            return 0
          }
        })
        return computeEffect(1)
      },
      equal: 0,
    },
    {
      type: "normal",
      title: "The function can also be used to handle the success of it's execution",
      expect: () => {
        const computeEffect = tsf.effect(sensitiveFunction, {
          SUCCESS: (x) => {
            return x * x
          },
          ERROR: (_) => {
            return 0
          }
        })
        return computeEffect(2)
      },
      equal: 4,
    },
    {
      type: "normal",
      title: "Ignoring error make it so that you'll have to handle it yourself manually",
      expect: () => {
        const computeEffect = tsf.effect(sensitiveFunction, {
          SUCCESS: (x) => {
            return x * x
          }
        })
        const result = computeEffect(1);
        return typeof result === "number" ? result : result.message
      },
      equal: "Divide by zero",
    }
  ]
})
