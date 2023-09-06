/**
* Select a property from a set of objects and return the one that correspond to the expected type.
*/
export type SelectFromExpect<
 Select extends string,
 From extends { [key: string]: unknown },
 Expect extends From[Select] | unknown,
 DefaultFallbackType = never
> = From extends { [P in Select]: Expect }
  ? From
  : DefaultFallbackType
