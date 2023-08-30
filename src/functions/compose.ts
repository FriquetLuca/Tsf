import { execute, executeAsync, type Result } from "./execute";
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
) {
  return (...arg: Parameters<FirstFunction>) => (fns as Function[]).reduce((acc, fn) => fn(acc), firstFn(arg)) as LastFunctionReturnType<F, ReturnType<FirstFunction>>
}

export function composeAsync<FirstFunction extends AnyFunctionAsync, F extends AnyFunctionAsync[]>(
  firstFn: FirstFunction,
  ...fns: ComposeFunctions<F>
) {
  return async (arg: Parameters<FirstFunction>[0]) => {
    let result: unknown = await firstFn(arg);
    for(let i = 0; i < fns.length;) {
      result = await fns[i++](result);
    }
    return result as Result<LastFunctionReturnType<F, ReturnType<FirstFunction>>>
  };
}

export function execCompose<FirstFunction extends AnyFunction, F extends Function[]>(
  firstFn: FirstFunction,
  ...fns: ComposeFunctions<F>
) {
  return (...arg: Parameters<FirstFunction>) => (fns as Function[]).reduce((acc, fn) => acc.success ? execute(fn as (...args: any) => any, acc.value) : acc, execute(firstFn, ...arg)) as Result<LastFunctionReturnType<F, ReturnType<FirstFunction>>>;
}

export function execComposeAsync<FirstFunction extends AnyFunctionAsync, F extends AnyFunctionAsync[]>(
  firstFn: FirstFunction,
  ...fns: ComposeFunctions<F>
) {
  return async (arg: Parameters<FirstFunction>[0]) => {
    let result: Result<unknown> = await executeAsync(firstFn, ...arg);
    for(let i = 0; i < fns.length;) {
      if(!result.success) {
        break;
      }
      result = await executeAsync(fns[i++], result.value);
    }
    return result as Result<LastFunctionReturnType<F, ReturnType<FirstFunction>>>
  };
}
