export type ResultSuccess<T> = {
  success: true;
  value: T;
};
export type ResultError = {
  success: false;
  error: Error;
}

export type Result<T> = ResultSuccess<T> | ResultError;

function ensureError(value: unknown): Error {
  if (value instanceof Error) {
    return value;
  }
  let stringified = '[Unable to stringify the thrown value]';
  try {
    stringified = JSON.stringify(value)
  } catch { }
  return new Error(`This value was thrown as is: ${stringified}`);
}

export function execute<T extends (...args: any) => any>(fn: T, ...args: Parameters<T>): Result<ReturnType<T>> {
  try {
    return {
      success: true,
      value: fn(args)
    }
  } catch (e: unknown) {
    return {
      success: false,
      error: ensureError(e)
    }
  }
}

export async function executeAsync<T extends (...args: any) => any>(fn: T, ...args: Parameters<T>): Promise<Result<ReturnType<T>>> {
  try {
    return {
      success: true,
      value: await fn(args)
    }
  } catch (e: unknown) {
    return {
      success: false,
      error: ensureError(e)
    }
  }
}
