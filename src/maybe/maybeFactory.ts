import { newMaybe, type MaybeValue } from "./maybe";

export type MaybeFactory<T> = {
  some: (value: T) => MaybeValue<T>,
  none: () => MaybeValue<T>,
  fromValue: (value: T) => MaybeValue<T>
}

export function maybeValueFactory<T>(defaultValue: T | null = null): MaybeFactory<T> {
  return {
    some: (value: T) => {
      if (value === null) {
        throw Error("Provided value must not be empty");
      }
      return newMaybe<T>(value, defaultValue);
    },
    none: () => newMaybe<T>(null, defaultValue),
    fromValue: (value: T) => value !== null ? newMaybe<T>(value, defaultValue) : newMaybe<T>(null, defaultValue)
  };
}
