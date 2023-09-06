import * as tsf from "../../src";
import { testPage } from "../tester"

testPage({
  title: "Map Object",
  tests: [
    {
      type: "normal",
      title: "Map the key-value of an object into an array",
      expect: () => {
        const result = tsf.mapObject({
          hello: "world",
          day: 1
        }, (key, value) => {
          return JSON.stringify({
            key: key,
            value: value
          })
        })
        return result.includes(JSON.stringify({
          key: "day",
          value: 1
        }))
      },
      equal: true,
    }
  ]
})
