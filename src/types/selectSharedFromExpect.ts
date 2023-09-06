/**
 * Select a shared property from a set of objects and return the one that correspond to the expected type.
 */
export type SelectSharedFromExpect<
  Select extends string,
  From extends { [P in Select]: unknown },
  Expect extends From[Select]
> = From extends { [P in Select]: Expect }
  ? From
  : never
