export type ProxyData = { [key: string]: any }

export type OnChangeCallback<
  T extends ProxyData,
  K extends Extract<keyof T, string>
> = (
  property: K,
  value: T[K]
) => void

export function createProxy<T extends ProxyData>(
  data: T,
  onChange?: OnChangeCallback<T, Extract<keyof T, string>>,
  onRemove?: (property: Extract<keyof T, string>) => void
) {
  return new Proxy(data, {
    set(target, property, value) {
      target[property as keyof typeof target] = value
      onChange && onChange(property as Extract<keyof T, string>, value)
      return true
    },
    deleteProperty(target, property){
      delete target[property as keyof typeof target]
      onRemove && onRemove(property as Extract<keyof T, string>)
      return true;
    }
  })
}
