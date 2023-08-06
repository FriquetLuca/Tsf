export type AnyFunction = (...arg: any) => any
export type AnyFunctionAsync = (...arg: any) => Promise<any>
/**
 * Append an argument's type to a function.
 */
export type AppendArgTypeToFunction<Fn, Type> = Fn extends (...args: infer R) => infer T ? (...args: [...R, ...[ Type]]) => T : never;
/**
 * Append tupple arguments to a function.
 */
export type AppendArgsToFunction<Fn, A extends unknown[]> = Fn extends (...args: infer R) => infer T ? (...args: [...R, ...A]) => T : never;
