/**
 * Allow a deep freeze of all properties of an object
 */
export type DeepReadonly<T> = { readonly [K in keyof T]: DeepReadonly<T[K]> }
