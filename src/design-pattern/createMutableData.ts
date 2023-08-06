export type MutableData<T> = {
  get: () => T,
  set: (item: T) => void
}
export function createMutableData<T>(mutableData: T): MutableData<T> {
  let x = mutableData;
  return {
    get: () => ({ ...x }),
    set: (item: T) => x = { ...item }
  }
}
