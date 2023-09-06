import type { Collapse } from "../../types";
/**
 * Add a property to an object
 * @param obj The object to appends a property and value to
 * @param propertyName The name of the property
 * @param value The value of the property
 * @returns The object with the new property added to it
 */
export function addProperty<O extends object, T extends string|number|symbol, V>(obj: O, propertyName: T, value: V) {
  let o: Record<T, V> = {} as Record<T, V>;
  o[propertyName] = value;
  return { ...obj, [propertyName]: value } as Collapse<O & Record<T, V>>;
}
