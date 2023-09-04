import * as tsf from "../src";
import { describe, expect, test } from '@jest/globals';

const testMustEqual = (props: {
  title: string, equal: unknown, expect: () => unknown
}) => {
  test(props.title, () => {
    expect(props.expect()).toEqual(props.equal);
  })
}

describe("Synchronous functions", () => {
  
  testMustEqual({
    title: "We can execute a function",
    expect: () => tsf.execute(() => {
      return Math.sqrt(25)
    }),
    equal: {
      success: true,
      value: 5
    },
  })

  testMustEqual({
    title: "We can pass arguments to an executed function",
    expect: () => tsf.execute((nbr: number) => {
      return Math.sqrt(nbr)
    }, 25),
    equal: {
      success: true,
      value: 5
    },
  })

  testMustEqual({
    title: "We know if the function ran successfully or not without crashing the application",
    expect: () => {
      const exec = tsf.execute((nbr: number) => {
        throw new Error("Application doesn't crash")
      }, 25)
      return exec.success ? exec.value : exec.error.message
    },
    equal: "Application doesn't crash",
  })

  testMustEqual({
    title: "We can decide what to do depending on if we succeed or not the execution",
    expect: () => {
      const doubledSqrt = (nbr: number) => {
        const sqr = Math.sqrt(nbr)
        return sqr + sqr
      }
      const executedResult = tsf.execute(doubledSqrt, 25)
      const result = tsf.match(executedResult, {
        SUCCESS: (value) => value * value,
        ERROR: () => 0
      })
      return result
    },
    equal: 100,
  })

  // testMustEqual({
  //   title: "We can compose functions",
  //   expect: () => tsf.compose(Math.sqrt, String.toString)(37),
  //   equal: 6,
  // })

  testMustEqual({
    title: "We can pipe functions to execute a specific value",
    expect: () => tsf.pipe(26, Math.sqrt, Math.floor),
    equal: 5,
  })

  testMustEqual({
    title: "We can compose functions and make them runs on an execute",
    expect: () => {
      const exec = tsf.execCompose(Math.sqrt, Math.floor)(26)
      return exec.success ? exec.value : exec.error.message
    },
    equal: 5,
  })

  testMustEqual({
    title: "We an error can happen without crashing the application",
    expect: () => {
      const exec = tsf.execCompose((n: number) => Math.sqrt(n), (n: number) => Math.floor(n), (x: number) => { if(x > 2) { throw new Error("Not implemented yet") } return x }, Math.cos)(26)
      return exec.success ? exec.value : exec.error.message
    },
    equal: "Not implemented yet",
  })
  
  testMustEqual({
    title: "Curry",
    expect: () => {
      return tsf.currying((n: number, u: string, v: string) => {
        return `${n.toString()}${u}${v}`
      })
      (10)("_hello_")("UwU")
    },
    equal: "10_hello_UwU",
  })

})
