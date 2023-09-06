import * as tsf from "../../src";
import { testPage } from "../tester"

testPage({
  title: "Merge",
  tests: [
    {
      type: "normal",
      title: "Merge two objects together",
      expect: () => {
        return tsf.merge({
          a: "hello",
          b: {
            c: 5
          },
          d: {
            b: 5
          }
        }, {
          b: 5,
          c: "world",
          d: {
            a: 10
          }
        })
      },
      equal: {
        a: "hello",
        b: 5,
        c: "world",
        d: {
          a: 10
        }
      },
    },
    {
      type: "normal",
      title: "Deeply merge two objects",
      expect: () => {
        return tsf.deepMerge({
          a: "hello",
          b: {
            c: 5
          },
          d: {
            b: 5
          }
        }, {
          b: 5,
          c: "world",
          d: {
            a: 10
          }
        })
      },
      equal: {
        a: "hello",
        b: 5,
        c: "world",
        d: {
          a: 10,
          b: 5
        }
      },
    }
  ]
})
