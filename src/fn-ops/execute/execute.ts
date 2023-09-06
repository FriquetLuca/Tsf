import type { Result } from "../../types"
import { ensureError } from "../../utils"

/**
 * Execute a function and handle any errors that might occurs in the process
 * @param fn A function to execute on a value
 * @param args The function's arguments
 * @returns A result that contain the returned value or an error
 */
export function execute<U extends Error, T extends (...args: any) => any>(fn: T, ...args: Parameters<T>): Result<ReturnType<T>, U> {
  try {
    return {
      success: true,
      value: fn(args)
    }
  } catch (e: unknown) {
    return {
      success: false,
      error: ensureError<U>(e)
    }
  }
}
