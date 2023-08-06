import { Equal } from "./types";

export function assertIsDefined<T>(value: T): asserts value is NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`${value} is not defined`)
  }
}

export function assertTypeEquality<A, B>(test: Equal<A, B>, msg: string = "the type tested") {
  if(!test) {
    throw new Error(`${msg} is false`);
  }
  return true;
}
