import { z } from "zod";

export const inviteFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  role: z.string({ error: "Role is required" }).min(1, "Please select a role"),
});

export type InviteFormValues = z.infer<typeof inviteFormSchema>;
