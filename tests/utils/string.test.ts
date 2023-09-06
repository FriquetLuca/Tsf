import * as tsf from "../../src";
import { testPage } from "../tester"

testPage({
  title: "String",
  tests: [
    {
      type: "normal",
      title: "Escape the string to make it readable on display",
      expect: () => tsf.displayEscapedString("Hello, \nthis is incredible to see\tso many ##é((&(&ii&é)à!"),
      equal: "Hello, \\u000athis is incredible to see\\u0009so many ##\\u00e9((&(&ii&\\u00e9)\\u00e0!",
    },
    {
      type: "normal",
      title: "Get the line and character position in a text of the character at a specific index",
      expect: () => tsf.getTextPosition("Hello\nmy\nname\nis...", 11),
      equal: {
        line: 2,
        lineChar: 3
      }
    },
    {
      type: "normal",
      title: "Duplicate a string as many times as needed",
      expect: () => tsf.duplicateString("Hello", 5),
      equal: "HelloHelloHelloHelloHello",
    }
  ]
})
