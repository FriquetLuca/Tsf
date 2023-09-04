import { ZodType, z } from "zod"

export function fromSchema<T extends ZodType>(schema: T) {
  return (match: z.infer<T>) => schema.safeParse(match)
}
