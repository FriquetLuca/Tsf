import * as tsf from "../../src";
import { testPage } from "../tester"

testPage({
  title: "Get Typeof",
  tests: [
    {
      type: "normal",
      title: "Get typeof a value",
      expect: () => {
        return tsf.getTypeof("uwu")
      },
      equal: "string",
    },
    {
      type: "normal",
      title: "Get typeof a class",
      expect: () => {
        class Something {
          constructor() {
  
          }
        }
        return tsf.getTypeof(Something)
      },
      equal: "class",
    },
    {
      type: "normal",
      title: "Get typeof a function",
      expect: () => {
        return tsf.getTypeof(() => {})
      },
      equal: "function",
    },
    {
      type: "normal",
      title: "Get typeof an array",
      expect: () => {
        return tsf.getTypeof([])
      },
      equal: "array",
    }
  ]
})
