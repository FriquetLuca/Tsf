import { z } from "zod"
import { testPage } from "../tester"
import * as tsf from "../../src"

const PropATypeSchema = z.object({
  value: z.number(),
});
const PropBTypeSchema = z.object({
  value: z.number(),
  multiply: z.function(z.tuple([z.number(), z.number()]), z.number()),
});

const MyADT = tsf.adtFactory("type")({
  propA: tsf.adtFromSchema(PropATypeSchema),
  propB: tsf.adtFromSchema(PropBTypeSchema),
});
const matcher = MyADT.match({
  propA: (arg) => arg.value.toString(),
  propB: (arg) => arg.multiply(arg.value, 2)
});
const strictMatcher = MyADT.strictMatch({
  propA: (arg) => arg.value.toString(),
  propB: (arg) => arg.multiply(arg.value, 2)
})

testPage({
  title: "ADT",
  tests: [
    {
      type: "strict",
      title: "We can create new objects from our ADT",
      expect: () => MyADT.of.propA({
        value: 25
      }),
      equal: {
        type: "propA",
        value: 25
      }
    },
    {
      type: "normal",
      title: "We can create new objects from our ADT",
      expect: () => JSON.stringify(MyADT.of.propB({ // Comparison of function is biased in js since even if they do the same things, they don't always have the same memory ID so js will think it's not the same function, whatever the test
        value: 50,
        multiply: (a: number, b: number) => a * b
      })),
      equal: JSON.stringify({
        type: "propB",
        value: 50,
        multiply: (a: number, b: number) => a * b
      })
    },
    {
      type: "normal",
      title: "We can compute specific ADT without bothering to know what ADT it is",
      expect: () => matcher(MyADT.of.propA({
        value: 10
      })),
      equal: "10"
    },
    {
      type: "normal",
      title: "We can compute specific ADT without bothering to know what ADT it is",
      expect: () => matcher(MyADT.of.propB({
        value: 10,
        multiply: (a: number, b: number) => a * b
      })),
      equal: 20
    },
    {
      type: "normal",
      title: "We can compute specific ADT without bothering to know what ADT it is and check data validity along the way",
      expect: () => strictMatcher(MyADT.of.propB({
        value: 10,
        multiply: (a: number, b: number) => a * b
      })),
      equal: 20
    },
    {
      type: "normal",
      title: "We can check what ADT we're facing",
      expect: () => MyADT.in(MyADT.of.propA({ value: 10 }), "propA"),
      equal: true
    },
    {
      type: "normal",
      title: "We can filter an ADT to handle it's existance",
      expect: () => MyADT.filter(MyADT.of.propA({ value: 10 }), "propA"),
      equal: {
        type: "propA",
        value: 10
      }
    },
    {
      type: "normal",
      title: "We can filter an ADT to handle it's existance",
      expect: () => MyADT.filter(MyADT.of.propB({
        value: 10,
        multiply: (a: number, b: number) => a * b
      }), "propA"),
      equal: undefined
    },
    {
      type: "normal",
      title: "We can extract the datas of an ADT",
      expect: () => MyADT.extract(MyADT.of.propA({ value: 10 }), "propA"),
      equal: { value: 10 }
    }
  ]
})
