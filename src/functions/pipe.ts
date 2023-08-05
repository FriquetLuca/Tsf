import type { ComposeFunctions, LastFunctionReturnType } from "./compose";
import type { AnyFunction } from "./type";

export function pipe<FirstFn extends AnyFunction, F extends AnyFunction[]>(
  arg: Parameters<FirstFn>[0],
  firstFn: FirstFn,
  ...fns: ComposeFunctions<F>
): LastFunctionReturnType<F, ReturnType<FirstFn>> {
  return (fns as AnyFunction[]).reduce((acc, fn) => fn(acc), firstFn(arg));
}
