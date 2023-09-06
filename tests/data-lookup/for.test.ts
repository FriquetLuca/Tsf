import * as tsf from "../../src";
import { testPage } from "../tester"

const dummyArray = [
  1,
  5,
  25,
  45
]

testPage({
  title: "For",
  tests: [
    {
      type: "normal",
      title: "We can look through an array like an usual forEach",
      expect: () => {
        let lastIndex: number|undefined = undefined
        const exec = (_: number, index: number) => { // We skip the item, and we don't take the array as last argument since we don't care about thoses here...
          lastIndex = index
        }
        tsf.forArray(dummyArray, exec)
        return lastIndex
      },
      equal: dummyArray.length - 1,
    },
    {
      type: "normal",
      title: "We can break through an array unlike an usual forEach",
      expect: () => {
        let lastIndex: number|undefined = undefined
        const exec = (_: number, index: number) => { // We skip the item, and we don't take the array as last argument since we don't care about thoses here...
          if(index == 2) {
            return true // Returning true is equivalent to a break in the loop here
          }
          lastIndex = index
        }
        tsf.forArray(dummyArray, exec)
        return lastIndex
      },
      equal: 1,
    },
    {
      type: "normal",
      title: "The execution can be skipped whenever we want by using a predicate",
      expect: () => {
        let lastIndex: number|undefined = undefined
        const predicate = (item: number) => {
          return item != 25
        }
        const exec = (_: number, index: number) => { // We skip the item, and we don't take the array as last argument since we don't care about thoses here...
          if(index == 2) {
            return true // Returning true is equivalent to a break in the loop here
          }
          lastIndex = index
        }
        tsf.forArray(dummyArray, exec, predicate)
        return lastIndex
      },
      equal: dummyArray.length - 1,
    },
    {
      type: "normal",
      title: "A backward version is available",
      expect: () => {
        let lastIndex: number|undefined = undefined
        const exec = (_: number, index: number) => { // We skip the item, and we don't take the array as last argument since we don't care about thoses here...
          if(index == 2) {
            return true // Returning true is equivalent to a break in the loop here
          }
          lastIndex = index
        }
        tsf.forArrayBackward(dummyArray, exec)
        return lastIndex
      },
      equal: 3,
    },
    {
      type: "normal",
      title: "The backward version should also handle predicate",
      expect: () => {
        let lastIndex: number|undefined = undefined
        const predicate = (item: number) => {
          return item != 25
        }
        const exec = (_: number, index: number) => { // We skip the item, and we don't take the array as last argument since we don't care about thoses here...
          if(index == 2) {
            return true // Returning true is equivalent to a break in the loop here
          }
          lastIndex = index
        }
        tsf.forArrayBackward(dummyArray, exec, predicate)
        return lastIndex
      },
      equal: 0,
    }
  ]
})
