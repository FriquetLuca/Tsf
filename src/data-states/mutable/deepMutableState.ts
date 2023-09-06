import type { DeepMutable } from "../../types"
import { deepMutable } from "./deepMutable"

export type DeepMutableData<T extends object> = {
  get: () => DeepMutable<T>,
  set: (item: T) => void
}

/**
 * Create a deeply mutable state variable
 * @param immutableData The data that will be used to initiate the deep mutable state
 * @returns A deeply mutable state
 */
export function deepMutableState<T extends object>(immutableData: T): DeepMutableData<T> {
  let x = deepMutable(immutableData)
  return {
    get: () => ({ ...x }),
    set: (item: T) => x = deepMutable(item)
  }
}
