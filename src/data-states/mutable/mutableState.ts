export type MutableData<T extends object> = {
  get: () => T,
  set: (item: T) => void
}
/**
 * Create a mutable state variable
 * @param immutableData The data that will be used to initiate the mutable state
 * @returns A mutable state
 */
export function mutableState<T extends object>(immutableData: T): MutableData<T> {
  let x = { ...immutableData }
  return {
    get: () => ({ ...x }),
    set: (item: T) => x = { ...item }
  }
}
