/**
 * Collapse the structure into a readable one
 */
export type Collapse<T> = T extends (...args: any[]) => any
  ? T
  : T extends object
    ? { [K in keyof T]: Collapse<T[K]> }
    : T
