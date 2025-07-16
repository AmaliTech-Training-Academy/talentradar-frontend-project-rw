import { z } from "zod/v4";

export const loginSchema = z.object({
  email: z.email().min(1, { error: "Email is required" }),
  password: z
    .string()
    .min(1, { error: "Password is required" })
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{6,}$/, {
      error:
        "It must contain at least: 1 number, 1 letter, 1 special. character & be at least 6 chars",
    }),
});

export type LoginSchemaProps = z.infer<typeof loginSchema>;
