export type Collapse<T> = T extends (...args: any[]) => any
  ? T
  : T extends object
    ? { [K in keyof T]: Collapse<T[K]> }
    : T
export type ExtendsOnly<T, U> = T extends U ? T : never
/**
* RemoveSignatureIndex<{ [key: string]: any; foo(): void; }> // { foo(): void }
*/
export type RemoveSignatureIndex<T> = { [Key in keyof T as Key extends `${infer ConcreteKey}` ? ConcreteKey : never ]: T[Key] }
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
        : T);
/**
 * The type is true if T is any, false otherwise
 */
export type IsAny<T> = 0 extends (1 & T) ? true : false
/**
 * Get the first type of the object extending the other.
 */
export type Inheritor<A, B> = A extends B ? A : B extends A ? B : never
/**
 * The type is true if T extends U or U extends T, false otherwise.
 */
export type Approximative<T, U> = T extends U ? true : U extends T ? true : false
/**
 * The type is true if two types are exactly the same type, false otherwise.
 */
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false
/**
 * The type is true if two types are equivalent (should share the same properties), false otherwise.
 */
export type Equivalent<X, Y> = Equal<{ [K in keyof X]: X[K] }, { [K in keyof Y]: Y[K] }>
