/**
 * The type is true if T is any, false otherwise
 */
export type IsAny<T> = 0 extends (1 & T) ? true : false
