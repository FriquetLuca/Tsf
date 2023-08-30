export function objectMap<T extends object, U>(item: T, mapper: (key: keyof T, value: T[keyof T]) => U) {
  const result: U[] = []
  for(const key in item) {
    result.push(mapper(key, item[key]))
  }
  return result
}
