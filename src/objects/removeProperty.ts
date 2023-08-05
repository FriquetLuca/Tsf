import type { Collapse } from "../any";

export function removeEntry<O extends object, T extends keyof O>(obj: O, propertyName: T) {
  const { [propertyName]: _, ...newObj } = obj;
  return newObj as Collapse<Omit<O, T>>;
}
