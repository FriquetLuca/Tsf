/**
 * Convert every property of type literal (label type) to a primitive type.
 */
export type ToPrimitive<T> = 
  T extends object
    ? (T extends (...args: infer A) => infer R
      ? (...args: { [K in keyof A]: ToPrimitive<A[K]>; }) => ToPrimitive<R>
      : T extends Promise<infer Pr>
      ? Promise<ToPrimitive<Pr>>
      : { [Key in keyof T]: ToPrimitive<T[Key]> })
    : (T extends Promise<infer Pr>
      ? Promise<ToPrimitive<Pr>>
      : T extends { valueOf: () => infer P }
        ? P
        : T)
