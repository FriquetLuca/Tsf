/**
 * Omit every properties that extends the specified type.
 */
export type OmitTypes<T, U> = { [P in keyof T as T[P] extends U ? never : P]: T[P] }
