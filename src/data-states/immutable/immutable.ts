/**
 * Make an object immutable at it's surface level
 * @param mutableData The supposed mutable object
 * @returns The object able to immutate at it's surface level
 */
export function immutable<T extends object>(mutableData: T) {
  return Object.freeze(mutableData)
}
