/**
 * Get all entries that must exist of an object.
 */
export type ObjectEntries<T> = { [K in keyof T]-?: [K, T[K]] }[keyof T]
