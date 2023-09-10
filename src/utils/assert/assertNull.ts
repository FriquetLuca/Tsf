/**
 * Throw an error if a value is null
 * @param value The value to assert
 */
export function assertNull<T>(value: T) {
  if (value === null) {
    throw new Error(`${value} is not null`)
  }
}
