export function adtFromType<T>(matcher?: (item: T) => T) {
  return (match: T) => matcher ? matcher(match) : match
}
