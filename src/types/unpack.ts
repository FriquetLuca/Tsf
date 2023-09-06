/**
 * Unpack the type of an array T, otherwise T
 */
export type Unpack<T> = T extends (infer A)[] ? A : T
