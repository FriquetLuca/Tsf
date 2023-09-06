/**
 * Of type T only if T extends U
 */
export type ExtendsOnly<T, U> = T extends U ? T : never
