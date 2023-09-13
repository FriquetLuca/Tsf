import { describe, expect, test } from '@jest/globals'
import type { Unpack } from '../src'

function tester<T>(props: {
  type: "normal", title: string, equal: T, expect: () => T
}) {
  test(props.title, () => expect(props.expect()).toEqual(props.equal))
}

function strictTester<T>(props: {
  type: "strict", title: string, equal: T, expect: () => T
}) {
  test(props.title, () => expect(props.expect()).toStrictEqual(props.equal))
}

function regexTester(props: {
  type: "regex"
  regex: RegExp
  tests: {
    label?: string
    value: string
    expect: RegExpExecArray | null
  }[]
}) {
  props.tests.forEach((t, index) => {
    const exec = props.regex.exec(t.value)
    const result = exec !== null ? exec.map(item => item) : null
    test(t.label ?? `regex test: ${index}`, () => expect(result).toEqual(t.expect))
  })
}

export function testPage(props: {
  title: string,
  tests: (Unpack<Parameters<typeof tester> | Parameters<typeof strictTester> | Parameters<typeof regexTester>>)[]
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
        case "regex":
          regexTester(test)
          break
      }
    })
  })
}
