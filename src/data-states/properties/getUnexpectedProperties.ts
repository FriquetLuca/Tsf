import type { Collapse } from "../../types"

/**
 * Get all properties from `item` that aren't in `keys`
 * @param item The object from which we're checking the properties
 * @param keys The list of properties we're expecting
 * @returns An array of all properties that weren't expected
 */
export function getUnexpectedProperties<T extends object, U extends keyof T>(item: T, keys: U[]) {
  const result: any[] = []
  for(const key in item) {
    if(!keys.includes(key as unknown as U)) {
      result.push(key as unknown as U)
    }
  }
  return result as Collapse<(keyof Omit<T, U>)[]>
}
