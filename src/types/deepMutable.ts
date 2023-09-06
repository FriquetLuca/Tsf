/**
 * Allow a deep mutation into an object
 */
export type DeepMutable<T> = { -readonly [K in keyof T]: DeepMutable<T[K]> }
