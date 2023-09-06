import type { Collapse } from "../../types";
/**
 * Remove a property from an object
 * @param obj The object to append the new property to
 * @param propertyName The name of the property to remove
 * @returns The object with the property removed
 */
export function removeProperty<O extends object, T extends keyof O>(obj: O, propertyName: T) {
  const { [propertyName]: _, ...newObj } = obj;
  return newObj as Collapse<Omit<O, T>>;
}
