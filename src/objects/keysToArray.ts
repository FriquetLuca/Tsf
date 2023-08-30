export function keysToArray<T extends object>(item: T) {
  const result: (keyof T)[] = []
  for(const key in item) {
    result.push(key)
  }
  return result
}
