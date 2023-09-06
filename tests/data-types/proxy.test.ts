import * as tsf from "../../src";
import { testPage } from "../tester"

testPage({
  title: "Proxy",
  tests: [
    {
      type: "normal",
      title: "Create a proxy to handle data changes",
      expect: () => {
        let x = 5
        const trigger = () => {
          x += 5
        }
        const proxy = tsf.createProxy({
          whatIs: "luv",
          something: {
            mustBe: "beautifyl",
            orelse: {
              o: 10
            }
          }
        }, trigger)
        proxy.whatIs = "love" // Trigger proxy
        proxy.something.mustBe = "beautiful" // Doesn't trigger proxy
        proxy.something.orelse.o = 15 // Doesn't trigger proxy
        return {
          sm: proxy.something.mustBe,
          x
        }
      },
      equal: {
        sm: "beautiful",
        x: 10
      },
    },
    {
      type: "normal",
      title: "Create a nested proxy to handle data changes",
      expect: () => {
        let x = 5
        const trigger = () => {
          x += 5
        }
        const proxy = tsf.createNestedProxy({
          whatIs: "luv",
          something: {
            mustBe: "beautifyl",
            orelse: {
              o: 10
            }
          }
        }, trigger)
        proxy.whatIs = "love" // Trigger proxy
        proxy.something.mustBe = "beautiful" // Trigger proxy
        proxy.something.orelse.o = 15 // Trigger proxy
        return {
          sm: proxy.something.orelse.o,
          x
        }
      },
      equal: {
        sm: 15,
        x: 20
      },
    }
  ]
})
