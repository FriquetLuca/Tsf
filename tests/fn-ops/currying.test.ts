import * as tsf from "../../src";
import { testPage } from "../tester"

testPage({
  title: "Currying",
  tests: [
    {
      type: "normal",
      title: "Call a function for each arguments of a function in it's correct order",
      expect: () => {
        return tsf.currying((n: number, u: string, v: string) => {
          return `${n.toString()}${u}${v}`
        })
        (10)("_hello_")("UwU")
      },
      equal: "10_hello_UwU",
    }
  ]
})
