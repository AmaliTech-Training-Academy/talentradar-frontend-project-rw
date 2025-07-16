import * as z from "zod";

export const ManagerFeedbackSchema = z.object({
  dimensions: z.array(
    z.object({
      dimension_definition_id: z.string(),
      rating: z.number().min(1).max(5),
      comment: z.string().min(1, "Dimension feedback is required"),
    })
  ),
  comments: z.array(
    z.object({
      id: z.string(),
      comment_title: z.string(),
      comment_content: z.string().min(1, "This field is required"),
    })
  ),
});