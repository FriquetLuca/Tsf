export type MaybeValue<T> = {
  getOrDefault: () => T | null,
  getOrElse: (defaultValue: T) => T,
  get: () => T | null
}

export function newMaybe<T>(value: T | null, defaultValue: T | null = null): MaybeValue<T> {
  return {
    get: () => value,
    getOrElse: (defaultValue: T) => value === null ? defaultValue : value,
    getOrDefault: () => value === null ? defaultValue : value
  }
}
