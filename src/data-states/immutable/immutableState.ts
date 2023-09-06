import { immutable } from "./immutable"

export type ImmutableData<T extends object> = {
  get: () => Readonly<T>
}
/**
 * Create an immutable state variable
 * @param mutableData The data that will be used to initiate the immutable state
 * @returns A immutable state
 */
export function immutableState<T extends object>(mutableData: T): ImmutableData<T> {
  const x = immutable(mutableData)
  return {
    get: () => x
  }
}
