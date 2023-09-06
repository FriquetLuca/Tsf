/**
 * From T, pick a set of properties whose type are assignable to U.
 */
export type PickType<T, U> = { [P in keyof T as T[P] extends U ? P : never]: T[P] }
