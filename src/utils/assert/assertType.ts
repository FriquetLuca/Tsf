import type { Equal } from "../../types";

/**
 * Assert the type equality test
 * @param test The type to test
 * @param msg The error message to display
 * @returns True if it doesn't throw an error
 */
export function assertType<A, B>(test: Equal<A, B>, msg?: string) {
  if(!test) {
    throw new Error(msg ?? "The type tested is false");
  }
  return true;
}
