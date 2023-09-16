export type Maybe<T> = {
  getOrDefault: () => T | null,
  getOrElse: (defaultValue: T) => T,
  get: () => T | null,
  map: <R>(f: (wrapped: T) => R) => Maybe<R>,
  flatMap: <R>(f: (wrapped: T) => Maybe<R>) => Maybe<R>,
  export: () => { value: T | null, defaultValue: T | null },
  toString: () => string
}

export function maybe<T>(value: T | null = null, defaultValue: T | null = null): Maybe<T> {
  return {
    get: () => value,
    getOrElse: (defaultValue: T) => value === null ? defaultValue : value,
    getOrDefault: () => value === null ? defaultValue : value,
    map: <R>(f: (wrapped: T) => R) => value === null
      ? defaultValue === null
        ? maybe<R>(null)
        : maybe(f(defaultValue))
      : maybe(f(value)),
    flatMap: <R>(f: (wrapped: T) => Maybe<R>) => value === null ? maybe<R>(null) : f(value),
    export: () => ({ value, defaultValue }),
    toString: () => value?.toString() ?? ""
  }
}

export type MaybeFactory<T> = {
  some: (value: T) => Maybe<T>,
  none: () => Maybe<T>,
  fromValue: (value: T|null) => Maybe<T>
}

export function maybeFactory<T>(defaultValue: T | null = null): MaybeFactory<T> {
  return {
    some: (value: T) => {
      if (value === null) {
        throw Error("Provided value must not be empty");
      }
      return maybe<T>(value, defaultValue);
    },
    none: () => maybe<T>(null, defaultValue),
    fromValue: (value: T | null) => maybe<T>(value, defaultValue),
  };
}
