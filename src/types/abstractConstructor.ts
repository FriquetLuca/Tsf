/**
 * Represent any constructor
 */
export type AbstractConstructor<T, U> = new (...args: T[]) => U
