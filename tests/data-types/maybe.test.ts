import * as tsf from "../../src";
import { testPage } from "../tester"

testPage({
  title: "Maybe",
  tests: [
    {
      type: "normal",
      title: "A type maybe can be created to handle the null value",
      expect: () => {
        const maybeNumberFactory = tsf.maybeFactory(0)
        const result = maybeNumberFactory.fromValue(25)
        return result.get()
      },
      equal: 25,
    },
    {
      type: "normal",
      title: "A type maybe can be null",
      expect: () => {
        const maybeNumberFactory = tsf.maybeFactory(0)
        const result = maybeNumberFactory.fromValue(null)
        return result.get()
      },
      equal: null,
    },
    {
      type: "normal",
      title: "A maybe factory can also provide a maybe null",
      expect: () => {
        const maybeNumberFactory = tsf.maybeFactory(0)
        const result = maybeNumberFactory.none()
        return result.get()
      },
      equal: null,
    },
    {
      type: "normal",
      title: "A type maybe that is null can use the default value",
      expect: () => {
        const maybeNumberFactory = tsf.maybeFactory(0)
        const result = maybeNumberFactory.fromValue(null)
        return result.getOrDefault()
      },
      equal: 0,
    },
    {
      type: "normal",
      title: "A type maybe can force to have a non nullable value as argument using the 'some' method",
      expect: () => {
        const maybeNumberFactory = tsf.maybeFactory(0)
        const result = maybeNumberFactory.some(25)
        return result.getOrDefault()
      },
      equal: 25,
    },
    {
      type: "normal",
      title: "We can force the use of null in a some method but it will throw an error",
      expect: () => {
        try {
          const maybeNumberFactory = tsf.maybeFactory(0)
          const result = maybeNumberFactory.some(null as any)
          return false
        } catch(e) {
          return true
        }
      },
      equal: true,
    }
  ]
})
