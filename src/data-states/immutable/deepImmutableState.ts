import type { DeepReadonly } from "../../types"
import { deepImmutable } from "./deepImmutable"

export type DeepImmutableData<T extends object> = {
  get: () => DeepReadonly<T>
}

/**
 * Create a deeply immutable state variable
 * @param mutableData The data that will be used to initiate the deep immutable state
 * @returns A deeply immutable state
 */
export function deepImmutableState<T extends object>(mutableData: T): DeepImmutableData<T> {
  const x = deepImmutable(mutableData)
  return {
    get: () => x
  }
}
