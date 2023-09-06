import type { Equal } from "./equal";

/**
 * The type is true if two types are equivalent (should share the same properties), false otherwise.
 */
export type Equivalent<X, Y> = Equal<{ [K in keyof X]: X[K] }, { [K in keyof Y]: Y[K] }>
