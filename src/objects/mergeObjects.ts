export function mergeObjects<T extends object, U extends object>(objA: T, objB: U) {
  return {
    ...objA,
    ...objB
  }
}
