/**
 * Throw an error if a value is either null or undefined
 * @param value The value to assert
 */
export function assertDefined<T>(value: T): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`${value} is not defined`)
  }
}
