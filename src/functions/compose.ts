import type { AnyFunction, AnyFunctionAsync } from "./type";

type ComposeArgs<
  F extends Function[],
  Acc extends Function[] = []
> = F extends [ (...args: infer A) => infer B ]
  ? [...Acc, (...args: A) => B]
  : F extends [(...args: infer A) => unknown, ...infer Tail]
    ? Tail extends [(arg: infer B) => unknown, ...any[]]
      ? ComposeArgs<Tail, [...Acc, (...args: A) => B]>
      : Acc
    : Acc
export type ComposeFunctions<F extends Function[]> = ComposeArgs<F> extends F ? F : ComposeArgs<F>
export type LastFunctionReturnType<
    F extends Array<Function>,
    Else = never
  > = F extends [ ...unknown[], (...arg: infer _) => infer R ]
    ? R
    : Else;
export type LastFunctionReturnTypeAsync<
    F extends Array<AnyFunctionAsync>,
    Else = never
  > = F extends [ ...unknown[], (...arg: infer _) => infer R ]
    ? Awaited<R>
    : Else;

export function compose<FirstFunction extends AnyFunction, F extends Function[]>(
  firstFn: FirstFunction,
  ...fns: ComposeFunctions<F>
): (arg: Parameters<FirstFunction>[0]) => LastFunctionReturnType<F, ReturnType<FirstFunction>> {
  return (arg: Parameters<FirstFunction>[0]) => (fns as Function[]).reduce((acc, fn) => fn(acc), firstFn(arg));
}

export function composeAsync<FirstFunction extends AnyFunctionAsync, F extends AnyFunctionAsync[]>(
  firstFn: FirstFunction,
  ...fns: ComposeFunctions<F>
): (arg: Parameters<FirstFunction>[0]) => Promise<Awaited<LastFunctionReturnType<F, Awaited<ReturnType<FirstFunction>>>>> {
  return async (arg: Parameters<FirstFunction>[0]) => {
    let result = await firstFn(arg);
    for(let i = 0; i < fns.length;) {
      result = await fns[i++](result);
    }
    return result
  };
}
