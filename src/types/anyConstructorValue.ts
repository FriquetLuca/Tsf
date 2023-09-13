/**
 * Represent any constructor value, you can choose your own arguments
 */
export type AnyConstructorValue<T> = new (...args: T[]) => any
