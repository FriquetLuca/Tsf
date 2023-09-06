/**
 * The type is true if two types are exactly the same type, false otherwise.
 */
export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends (<T>() => T extends Y ? 1 : 2) ? true : false
