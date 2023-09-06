import type { Mutable } from "../../types";
/**
 * Make an object mutable at it's surface level
 * @param immutableData The supposed immutable object
 * @returns The object able to mutate at it's surface level
 */
export function mutable<T extends object>(immutableData: T): Mutable<T> {
  return { ...immutableData }
}
