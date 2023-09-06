/**
 * Append an argument's type to a function.
 */
export type AppendArgTypeToFunction<Fn, Type> = Fn extends (...args: infer R) => infer T ? (...args: [...R, ...[ Type]]) => T : never
