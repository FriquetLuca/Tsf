import * as tsf from "../../src"
import { testPage } from "../tester"

testPage({
  title: "Typeof",
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
    },
    {
      type: "normal",
      title: "Match the type of a value",
      expect: () => {
        return tsf.matchTypeof(125, {
          number: (x) => x * 2
        })
      },
      equal: 250,
    },
    {
      type: "normal",
      title: "Not implementing a transformation for the match would lead to the value being returned back without transformation",
      expect: () => {
        return tsf.matchTypeof(125, {})
      },
      equal: 125,
    },
    {
      type: "normal",
      title: "Match the type of a value",
      expect: () => {
        return tsf.matchTypeof(125, {
          number: (x) => x * 2,
          boolean: (b) => !b
        })
      },
      equal: 250,
    }
  ]
})
