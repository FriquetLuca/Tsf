/**
 * Get an array containing all the properties names of the object
 * @param item The object from which we want the properties names
 * @returns An array containing all the properties names from the object
 */
export function getPropertiesNames<T extends object>(item: T) {
  const result: (keyof T)[] = []
  for(const key in item) {
    result.push(key)
  }
  return result
}
