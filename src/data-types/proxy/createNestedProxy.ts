import type { ProxyData, OnChangeCallback } from "./createProxy";

export function createNestedProxy<T extends ProxyData>(
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
      if (property == 'isProxy') return true;
      const value = target[property as Extract<keyof T, string>]
      if (typeof value === 'object' && value !== null) {
        return createNestedProxy(value, onChange)
      }
      return value
    },
  })
}
