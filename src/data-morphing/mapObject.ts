/**
 * Map every key-value of an object inside an array
 * @param item The object from which we want to map
 * @param mapper A function to handle the mapping of the values
 * @returns An array containing mapped values
 */
export function mapObject<T extends object, U>(item: T, mapper: (key: keyof T, value: T[keyof T]) => U) {
  const result: U[] = []
  for(const key in item) {
    result.push(mapper(key, item[key]))
  }
  return result
}
