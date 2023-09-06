/**
 * Append tupple arguments to a function.
 */
export type AppendArgsToFunction<Fn, A extends unknown[]> = Fn extends (...args: infer R) => infer T ? (...args: [...R, ...A]) => T : never
