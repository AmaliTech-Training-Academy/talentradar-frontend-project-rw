import { InviteFormValues } from "../schemas/invite-schema";
import { InviteRes } from "../types/invite";
import { ApiResponse } from "../types/response";
import { handleError, handleResponse } from "../utils";

export async function sendInvite(
  data: InviteFormValues
): Promise<ApiResponse<InviteRes>> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/invite`,
      {
        method: "POST",
        body: JSON.stringify(data),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    );
    return await handleResponse<InviteRes>(res);
  } catch (error) {
    return handleError(error);
  }
}
