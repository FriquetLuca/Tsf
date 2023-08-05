import { ZodType, z } from "zod";

export function safeType<T extends ZodType>(schema: T) {
  return (match: z.infer<T>) => schema.safeParse(match);
}
