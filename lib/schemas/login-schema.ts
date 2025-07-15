import { z } from "zod/v4";

export const loginSchema = z.object({
  email: z.email().min(1, { error: "Email is required" }),
  password: z.string().min(1, { error: "Password is required" }).min(4, {
    error: "Password must be above 3 characters",
  }),
});

export type LoginSchemaProps = z.infer<typeof loginSchema>;
