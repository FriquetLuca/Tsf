type FirstAsTuple<T extends any[]> = T extends [any, ...infer R]
  ? T extends [...infer F, ...R]
    ? F
    : never
  : never

export type Currying<F> = F extends (...args: infer Args) => infer Return
  ? Args['length'] extends 0 | 1
    ? F
    : Args extends [any, ...infer Rest]
    ? (...args: FirstAsTuple<Args>) => Currying<(...rest: Rest) => Return>
    : never
  : never

export function currying<T extends any[], R>(fn: (...args: T) => R, depth = 0, ...rest: any[]): Currying<typeof fn> {
  if(depth < fn.length) {
    const carryOver = (item: T[typeof depth]) => {
      return currying(fn, depth + 1, ...[...rest, item])
    }
    return carryOver as Currying<T>
  }
  return fn(...rest as T) as Currying<T>
}