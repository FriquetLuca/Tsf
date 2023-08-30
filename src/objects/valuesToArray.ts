export default function valuesToArray<T extends object>(item: T): T[keyof T][] {
  const result: T[keyof T][] = []
  for(const key in item) {
    result.push(item[key])
  }
  return result
}
