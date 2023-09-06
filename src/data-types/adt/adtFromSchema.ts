import type { ZodType, z } from "zod"

export function adtFromSchema<T extends ZodType>(schema: T) {
  return (match: z.infer<T>) => schema.safeParse(match)
}
