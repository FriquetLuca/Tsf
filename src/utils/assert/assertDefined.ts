/**
 * Throw an error if a value is undefined
 * @param value The value to assert
 */
export function assertDefined<T>(value: T) {
  if (value === undefined) {
    throw new Error(`${value} is not defined`)
  }
}
