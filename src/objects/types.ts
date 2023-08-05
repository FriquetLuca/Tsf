export type CreateObjectFromProperty<Name extends string, TypeName> = Name extends string ? { [K in Name]: TypeName } : never
/**
 * Pick keys that should be required in an object. If no keys is provided, then all keys would be required.
 */
export type PickRequiredKeys<T, K extends keyof T = keyof T> = Omit<T & Required<Pick<T, K & keyof T>>, never>;
/**
 * Mutable<{ readonly title: string; readonly description: string; readonly completed: boolean}> // { title: string; description: string; completed: boolean; }
 */
export type Mutable<T> = { -readonly [K in keyof T]: T[K] };
/**
 * Set K keys from T as readonly.
 */
export type SetPropertiesToImmutable<T, K extends keyof T = keyof T> = { readonly [k in K]: T[k]} & { [k in Exclude<keyof T, K>]: T[k] };
/**
 * Merge the current structure of an object.
 */
export type MergeStructure<T> = T extends infer U ? U extends number ? number : U extends string ? string : U extends object ? U extends [infer V] ? [MergeStructure<V>] : U extends [infer V, ...infer W] ? [MergeStructure<V>, MergeStructure<W>] : { [K in keyof U]: MergeStructure<U[K]> } : never : never
/**
 * From T, pick a set of properties whose type are assignable to U.
 */
export type PickType<T, U> = { [P in keyof T as T[P] extends U ? P : never]: T[P] }
/**
 * Omit every properties that extends the specified type.
 */
export type OmitTypes<T, U> = { [P in keyof T as T[P] extends U ? never : P]: T[P] }
/**
 * Get all entries that must exist of an object.
 */
export type ObjectEntries<T> = { [K in keyof T]-?: [K, T[K]] }[keyof T];
/**
 * Select a shared property from a set of objects and return the one that correspond to the expected type.
 */
export type SelectSharedFromExpect<
  Select extends string,
  From extends { [P in Select]: unknown },
  Expect extends From[Select]
> = From extends { [P in Select]: Expect }
  ? From
  : never
/**
* Select a property from a set of objects and return the one that correspond to the expected type.
*/
export type SelectFromExpect<
 Select extends string,
 From extends { [key: string]: unknown },
 Expect extends From[Select] | unknown,
 DefaultFallbackType = never
> = From extends { [P in Select]: Expect }
  ? From
  : DefaultFallbackType
