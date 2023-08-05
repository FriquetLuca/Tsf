import type { Collapse } from "../any";

export function addProperty<O extends object, T extends string|number|symbol, V>(obj: O, propertyName: T, value: V) {
  let o: Record<T, V> = {} as Record<T, V>;
  o[propertyName] = value;
  return { ...obj, [propertyName]: value } as Collapse<O & Record<T, V>>;
}
