import * as z from "zod";

export const ManagerFeedbackSchema = z.object({
  dimensions: z.array(
    z.object({
      dimensionDefinitionId: z.string(),
      rating: z.number().min(1).max(5),
      comment: z.string().min(1, "Dimension feedback is required"),
    })
  ),
  feedbackComments: z.array(
    z.object({
      commentId: z.string(),
      feedbackCommentBody: z.string().min(1, "This field is required"),
    })
  ),
});