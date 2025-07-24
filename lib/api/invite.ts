import { InviteFormValues } from "../schemas/invite-schema";
import { InviteRes } from "../types/invite";
import { ApiResponse } from "../types/response";
import { handleError, handleResponse } from "../utils";
import { sendInviteMock } from "../mock/invite";

const useMock = false;
export async function sendInvite(
  data: InviteFormValues
): Promise<ApiResponse<InviteRes>> {
  if (useMock) {
    return await sendInviteMock(data.email);
  }
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
