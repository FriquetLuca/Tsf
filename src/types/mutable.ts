/**
 * Allow the properties of an object to be mutable
 */
export type Mutable<T> = { -readonly [K in keyof T]: T[K] }
