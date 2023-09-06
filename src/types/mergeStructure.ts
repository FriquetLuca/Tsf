/**
 * Merge the current structure of an object.
 */
export type MergeStructure<T> = T extends infer U ? U extends number ? number : U extends string ? string : U extends object ? U extends [infer V] ? [MergeStructure<V>] : U extends [infer V, ...infer W] ? [MergeStructure<V>, MergeStructure<W>] : { [K in keyof U]: MergeStructure<U[K]> } : never : never
