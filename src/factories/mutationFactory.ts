export type MutableData<T extends object> = {
  get: () => T,
  set: (item: T) => void
}

export function mutationFactory<T extends object>(mutableData: T): MutableData<T> {
  let x = mutableData;
  return {
    get: () => ({ ...x }),
    set: (item: T) => x = { ...item }
  }
}
