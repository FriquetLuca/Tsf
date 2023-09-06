import * as tsf from "../../src";
import { testPage } from "../tester"

testPage({
  title: "Monad",
  tests: [
    {
      type: "normal",
      title: "You can create a type monad with a custom value",
      expect: () => {
        const monadGenerator = tsf.monadFactory("_type")
        return JSON.stringify(monadGenerator("base").unit(5))
      },
      equal: JSON.stringify({
        _type: "base",
        value: 5
      }),
    },
    {
      type: "normal",
      title: "You can apply functions to your value",
      expect: () => {
        const monadGenerator = tsf.monadFactory("_type")
        return JSON.stringify(monadGenerator("base").unit(5).bind((v) => v * 2))
      },
      equal: JSON.stringify({
        _type: "base",
        value: 10
      }),
    },
    {
      type: "normal",
      title: "You can extract the value of your monad",
      expect: () => {
        const monadGenerator = tsf.monadFactory("_type")
        const value = monadGenerator("base").unit(5).value
        const bindValue = monadGenerator("base").unit(5).bind((v) => v * 2).value
        return {
          value,
          bindValue
        }
      },
      equal: {
        value: 5,
        bindValue: 10
      },
    }
  ]
})
