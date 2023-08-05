export type Unpack<T> = T extends (infer A)[] ? A : T
export type IsInArrayOfType<T, U> = T extends U[] ? T : T extends U ? [ T ] : never
