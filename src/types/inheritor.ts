/**
 * Get the first type of the object extending the other.
 */
export type Inheritor<A, B> = A extends B ? A : B extends A ? B : never
