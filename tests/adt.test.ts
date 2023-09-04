import { z } from "zod";
import * as tsf from "../src";
import { describe, expect, test } from '@jest/globals';

describe("ADT", () => {
  const PropATypeSchema = z.object({
    value: z.number(),
  });
  const PropBTypeSchema = z.object({
    value: z.number(),
    multiply: z.function(z.tuple([z.number(), z.number()]), z.number()),
  });

  const MyADT = tsf.adtFactory("type")({
    propA: tsf.fromSchema(PropATypeSchema),
    propB: tsf.fromSchema(PropBTypeSchema),
  });
  const matcher = MyADT.match({
    propA: (arg) => arg.value.toString(),
    propB: (arg) => arg.multiply(arg.value, 2)
  });

  // TESTS HERE
  test("We can create new objects from our ADT", () => {
    expect(MyADT.of.propA({
      value: 25
    })).toStrictEqual({
      type: "propA",
      value: 25
    });
    expect(JSON.stringify(MyADT.of.propB({ // Comparison of function is biased in js since even if they do the same things, they don't always have the same memory ID so js will think it's not the same function, whatever the test
      value: 50,
      multiply: (a: number, b: number) => a * b
    }))).toBe(JSON.stringify({
      type: "propB",
      value: 50,
      multiply: (a: number, b: number) => a * b
    }));
  })
  test("We can compute specific ADT without bothering to know what ADT it is", () => {
    const matchingPropA = matcher({
      type: "propA",
      value: 10
    })
    expect(matchingPropA).toBe("10");
    const matchingPropB = matcher({
      type: "propB",
      value: 10,
      multiply: (a: number, b: number) => a * b
    })
    expect(matchingPropB).toBe(20);
  })
})
