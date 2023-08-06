import type { ComposeFunctions, LastFunctionReturnType, LastFunctionReturnTypeAsync } from "./compose";
import type { AnyFunction, AnyFunctionAsync } from "./type";

export function pipe<FirstFunction extends AnyFunction, F extends AnyFunction[]>(
  arg: Parameters<FirstFunction>[0],
  firstFn: FirstFunction,
  ...fns: ComposeFunctions<F>
): LastFunctionReturnType<F, ReturnType<FirstFunction>> {
  return (fns as AnyFunction[]).reduce((acc, fn) => fn(acc), firstFn(arg));
}

export async function pipeAsync<FirstFunction extends AnyFunctionAsync, F extends AnyFunctionAsync[]>(
  arg: Parameters<FirstFunction>[0],
  firstFn: FirstFunction,
  ...fns: ComposeFunctions<F>
): Promise<Awaited<LastFunctionReturnType<F, ReturnType<FirstFunction>>>> {
  let result = await firstFn(arg);
  for(let i = 0; i < fns.length;) {
    result = await fns[i++](result);
  }
  return result;
}
