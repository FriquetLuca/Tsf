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
    },
    {
      type: "normal",
      title: "We can use the `toString` method on a maybe type",
      expect: () => {
        const maybeNumberFactory = tsf.maybeFactory(0)
        const result = maybeNumberFactory.some(25)
        return result.toString()
      },
      equal: "25",
    },
    {
      type: "normal",
      title: "We can apply a function on a maybe value that isn't null",
      expect: () => {
        const maybeNumberFactory = tsf.maybeFactory(0)
        const result = maybeNumberFactory.some(25)
        return result
          .map((x: number) => (x * 3).toString())
          .get()
      },
      equal: "75",
    },
    {
      type: "normal",
      title: "We can only apply a function on a maybe value that isn't null",
      expect: () => {
        const result = tsf.maybe<number>()
        return result
          .map((x: number) => (x * 3).toString())
          .get()
      },
      equal: null,
    },
    {
      type: "normal",
      title: "We can apply a function on a maybe value, but the function must return a maybe value and not a value",
      expect: () => {
        const maybeNumberFactory = tsf.maybeFactory(0)
        const result = maybeNumberFactory.some(25)
        return result
          .flatMap((x: number) => tsf.maybe(x * 3, null))
          .get()
      },
      equal: 75,
    }
  ]
})
