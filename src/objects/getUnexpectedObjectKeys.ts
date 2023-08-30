export function getUnexpectedObjectKeys<T extends object, U extends keyof T>(item: T, keys: U[]) {
  const result: U[] = []
  for(const key in item) {
    if(!keys.includes(key as unknown as U)) {
      result.push(key as unknown as U)
    }
  }
  return result
}
