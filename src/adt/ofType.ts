import { ZodType, z } from "zod";

export function ofType<T extends ZodType>(schema: T) {
  return (match: z.infer<T>) => schema.safeParse(match);
}
