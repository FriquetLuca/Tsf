import * as tsf from "../../src";
import { testPage } from "../tester"

class DummyClass {
  public num: number
  constructor(prop: number) {
    this.num = prop
  }
}

testPage({
  title: "Is Instance Of",
  tests: [
    {
      type: "normal",
      title: "Test if it's an instance of a class",
      expect: () => {
        return tsf.isInstanceOf([], DummyClass)
      },
      equal: false,
    },
    {
      type: "normal",
      title: "Test if it's an instance of a class",
      expect: () => {
        const dummy = new DummyClass(25)
        return tsf.isInstanceOf(dummy, DummyClass)
      },
      equal: true,
    }
  ]
})
