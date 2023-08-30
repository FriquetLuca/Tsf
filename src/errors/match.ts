import type { Result } from "../functions"

export function match<T, U, V>(result: Result<T>, match: {
  SUCCESS: (value: T) => U,
  ERROR: (error: Error) => V
}) {
  return result.success ? match.SUCCESS(result.value) : match.ERROR(result.error)
}
