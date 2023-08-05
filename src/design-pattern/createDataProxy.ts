type Data = { [key: string]: any }

export type OnChangeCallback<
  T extends Data,
  K extends Extract<keyof T, string>
> = (
  property: K,
  value: T[K]
) => void

export function createDataProxy<T extends Data>(
  data: T,
  onChange: OnChangeCallback<T, Extract<keyof T, string>>
): T {
  return new Proxy(data, {
    set(target, property, value) {
      target[property as keyof typeof target] = value
      onChange(property as Extract<keyof T, string>, value)
      return true
    },
  });
}

export function createNestedDataProxy<T extends Data>(
  data: T,
  onChange: OnChangeCallback<T, Extract<keyof T, string>>
): T {
  if (typeof data !== 'object' || data === null) {
    return data
  }
  return new Proxy(data, {
    set(target, property, value) {
      target[property as keyof typeof target] = value
      onChange(property as Extract<keyof T, string>, value)
      return true
    },
    get(target, property) {
      const value = target[property as Extract<keyof T, string>]
      if (typeof value === 'object' && value !== null) {
        return createDataProxy(value, onChange)
      }
      return value
    },
  });
}
