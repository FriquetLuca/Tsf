import { testPage } from "../tester"
import * as tsf from "../../src"

testPage({
  title: "Mutable",
  tests: [
    {
      type: "normal",
      title: "Checking if a value is now mutable",
      expect: () => Object.isFrozen(
        tsf.mutable(
          tsf.immutable({
            value: 10
          })
        )
      ),
      equal: false
    },
    {
      type: "normal",
      title: "Checking if a value is now a mutable state",
      expect: () => Object.isFrozen(
        tsf.mutableState(
          tsf.immutable({
            value: 10
          })
        )
        .get()
      ),
      equal: false
    },
    {
      type: "normal",
      title: "Checking if a deep value is now mutable",
      expect: () => Object.isFrozen(
        tsf.deepMutable(
          tsf.deepImmutable({
            value: {
              subValue: 15
            }
          })
        )
        .value
      ),
      equal: false
    },
    {
      type: "normal",
      title: "Checking if a deep value is now an immutable state",
      expect: () => Object.isFrozen(
        tsf.deepMutableState(
          tsf.deepImmutable({
            value: {
              subValue: 15
            }
          })
        )
        .get()
        .value
      ),
      equal: false
    }
  ]
})
