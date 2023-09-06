import type { Result } from "../../types"

export function matchExecute<T, U extends Error, V extends (error: U) => T|U, W extends {
  SUCCESS: (value: T) => T,
  ERROR?: V
}>(result: Result<T, U>, match: W): W["ERROR"] extends V
  ? (typeof result)["success"] extends true
    ? T
    : ReturnType<W["ERROR"]>
  : T | U
  {
  if(result.success) {
    return match.SUCCESS(result.value) as any
  }
  const errorResult = (match?.ERROR && match.ERROR(result.error)) ?? result.error
  if(errorResult instanceof Error) {
    return errorResult as any
  }
  return errorResult as any
}
