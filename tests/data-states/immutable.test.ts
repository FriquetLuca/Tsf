import { testPage } from "../tester"
import * as tsf from "../../src"

testPage({
  title: "Immutable",
  tests: [
    {
      type: "normal",
      title: "Checking if a value is now immutable",
      expect: () => Object.isFrozen(
        tsf.immutable({
          value: 10
        })
      ),
      equal: true
    },
    {
      type: "normal",
      title: "Checking if a value is now an immutable state",
      expect: () => Object.isFrozen(
        tsf.immutableState({
          value: 10
        })
        .get()
      ),
      equal: true
    },
    {
      type: "normal",
      title: "Checking if a deep value is now immutable",
      expect: () => Object.isFrozen(
        tsf.deepImmutable({
          value: {
            subValue: 15
          }
        })
        .value
      ),
      equal: true
    },
    {
      type: "normal",
      title: "Checking if a deep value is now an immutable state",
      expect: () => Object.isFrozen(
        tsf.deepImmutableState({
          value: {
            subValue: 15
          }
        })
        .get()
        .value
      ),
      equal: true
    }
  ]
})
