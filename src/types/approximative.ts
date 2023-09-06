/**
 * The type is true if T extends U or U extends T, false otherwise.
 */
export type Approximative<T, U> = T extends U ? true : U extends T ? true : false
