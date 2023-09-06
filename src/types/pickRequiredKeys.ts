/**
 * Pick keys that should be required in an object. If no keys is provided, then all keys would be required.
 */
export type PickRequiredKeys<T, K extends keyof T = keyof T> = Omit<T & Required<Pick<T, K & keyof T>>, never>
