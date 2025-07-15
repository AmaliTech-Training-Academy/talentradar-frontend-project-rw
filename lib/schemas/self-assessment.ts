import * as z from "zod";

export const SelfAssessmentSchema = z.object({
  reflection: z.string().min(10, "Reflection must be at least 10 characters."),
  dimensions: z.array(
    z.object({
      dimension_definition_id: z.string().uuid(),
      rating: z.number().min(1).max(5),
    })
  ),
});