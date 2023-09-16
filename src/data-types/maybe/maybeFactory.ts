import { type Perhaps, perhaps } from "../perhaps"
import { Possibly, possibly } from "../possibly"

export type Maybe<T> = {
  readonly value: T | null
  readonly defaultValue: T | null
  isEmpty: () => boolean
  getOrDefault: () => T | null
  getOrElse: (defaultValue: T) => T
  get: () => T | null
  map: <R>(f: (wrapped: T) => R) => Maybe<R>
  flatMap: <R>(f: (wrapped: T) => Maybe<R>) => Maybe<R>
  default: () => T | null
  perhaps: () => Perhaps<T>
  possibly: () => Possibly<T>
}

export function maybe<T>(value: T | null = null, defaultValue: T | null = null): Maybe<T> {
  return {
    value,
    defaultValue,
    isEmpty: () => value === null,
    get: () => value,
    getOrElse: (defaultValue: T) => value === null ? defaultValue : value,
    getOrDefault: () => value === null ? defaultValue : value,
    map: <R>(f: (wrapped: T) => R) => value === null
      ? defaultValue === null
        ? maybe<R>(null)
        : maybe(f(defaultValue))
      : maybe(f(value)),
    flatMap: <R>(f: (wrapped: T) => Maybe<R>) => value === null
      ? defaultValue === null
        ? maybe<R>(null)
        : f(defaultValue)
      : f(value),
    default: () => defaultValue,
    perhaps: () => perhaps<T>(value, defaultValue),
    possibly: () => value !== null ? possibly<T>(value, defaultValue !== null ? defaultValue : undefined) : possibly<T>(undefined, defaultValue !== null ? defaultValue : undefined)
  }
}

export type MaybeFactory<T> = {
  some: (value: T) => Maybe<T>
  none: () => Maybe<T>
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
