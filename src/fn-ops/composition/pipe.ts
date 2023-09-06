import type { AnyFunction, Unpack } from "../../types";
import type { FunctionAsChain, LastIndexOfFunctionArray } from "./compose";

export function pipe<F extends [AnyFunction, ...Array<AnyFunction>]>(
  arg: Unpack<Parameters<F[0]>>,
  ...fns: F & FunctionAsChain<F>
) {
  return (fns as Function[]).reduce((acc, fn) => fn(acc), arg) as ReturnType<F[LastIndexOfFunctionArray<F>]>
}
