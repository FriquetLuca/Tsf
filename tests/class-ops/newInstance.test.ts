import * as tsf from "../../src";
import { testPage } from "../tester"

class Test {
  constructor() { }
  hello() {
    return "hello"
  }
}

testPage({
  title: "New Instance",
  tests: [
    {
      type: "normal",
      title: "Create a new instance of a class",
      expect: () => tsf.newInstance(Test).hello(),
      equal: "hello",
    }
  ]
})
