/**
 * A generic Result type
 */
export type Result<T, U extends Error = Error> = {
  success: true,
  value: T
} | {
  success: false,
  error: U
}
