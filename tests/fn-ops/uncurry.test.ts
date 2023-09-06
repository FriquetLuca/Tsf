import * as tsf from "../../src";
import { testPage } from "../tester"

testPage({
  title: "Uncurry",
  tests: [
    {
      type: "normal",
      title: "Uncurry nested functions into a single function",
      expect: () => {
        const uncurrFn = tsf.uncurry((a: number) => (b: string) => (c: object) => {
          return `${a}${b}${c}`
        })
        return uncurrFn(25, "gg", {})
      },
      equal: "25gg[object Object]",
    }
  ]
})
