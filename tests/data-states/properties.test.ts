import * as tsf from "../../src";
import { testPage } from "../tester"

testPage({
  title: "Properties",
  tests: [
    {
      type: "normal",
      title: "Add a property on an object",
      expect: () => {
        return tsf.addProperty({}, "hello", "world").hello
      },
      equal: "world",
    },
    {
      type: "normal",
      title: "Remove a property of an object",
      expect: () => {
        return (tsf.removeProperty({
          hello: "world"
        }, "hello") as any).hello
      },
      equal: undefined,
    },
    {
      type: "normal",
      title: "Get all unexpected properties from an object",
      expect: () => {
        return tsf.getUnexpectedProperties({
          hello: "world",
          allo: "wald"
        }, ["hello"])
      },
      equal: ["allo"],
    },
    {
      type: "normal",
      title: "Get all properties names from an object",
      expect: () => {
        return JSON.stringify(tsf.getPropertiesNames({
          hello: "world",
          allo: "wald"
        }))
      },
      equal: JSON.stringify([
        "hello",
        "allo"
      ]),
    }
  ]
})
