export type Maybe<T> = {
  getOrDefault: () => T | null,
  getOrElse: (defaultValue: T) => T,
  get: () => T | null
}

function maybe<T>(value: T | null, defaultValue: T | null = null): Maybe<T> {
  return {
    get: () => value,
    getOrElse: (defaultValue: T) => value === null ? defaultValue : value,
    getOrDefault: () => value === null ? defaultValue : value
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
    fromValue: (value: T | null) => maybe<T>(value, defaultValue)
  };
}
