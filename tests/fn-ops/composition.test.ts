import * as tsf from "../../src";
import { testPage } from "../tester"

testPage({
  title: "Composition",
  tests: [
    {
      type: "normal",
      title: "We can compose functions",
      expect: () => tsf.compose(Math.sqrt, (x: number) => x.toString(), (x: string) => x.endsWith("6"))(36),
      equal: true,
    },
    {
      type: "normal",
      title: "We can execute the composition of functions on the fly",
      expect: () => tsf.pipe(36, Math.sqrt, (x: number) => x.toString(), (x: string) => x),
      equal: "6",
    }
  ]
})
