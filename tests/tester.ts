import { describe, expect, test } from '@jest/globals';
import type { Unpack } from '../src';

export function tester<T>(props: {
  type: "normal", title: string, equal: T, expect: () => T
}) {
  test(props.title, () => expect(props.expect()).toEqual(props.equal))
}

export function strictTester<T>(props: {
  type: "strict", title: string, equal: T, expect: () => T
}) {
  test(props.title, () => expect(props.expect()).toStrictEqual(props.equal))
}

export function testPage(props: {
  title: string,
  tests: (Unpack<Parameters<typeof tester> | Parameters<typeof strictTester>>)[]
}) {
  describe(props.title, () => {
    props.tests.forEach((test) => {
      switch(test.type) {
        case "normal":
          tester(test)
          break
        case "strict":
          strictTester(test)
          break
      }
    })
  })
}
