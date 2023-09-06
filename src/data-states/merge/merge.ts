import type { Collapse } from "../../types"
/**
 * A shallow merge between two objects
 * @param objA source A
 * @param objB source B
 * @returns The shallow merge between the source A and B
 */
export function merge<T extends object, U extends object>(objA: T, objB: U) {
  return {
    ...objA,
    ...objB
  } as Collapse<T & U>
}
