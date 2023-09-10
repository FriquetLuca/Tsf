/**
 * Throw an error if a value is either null or undefined
 * @param value The value to assert
 */
export function assertExist<T>(value: T) {
  if (value === undefined || value === null) {
    throw new Error(`${value} is either undefined or null`)
  }
}
