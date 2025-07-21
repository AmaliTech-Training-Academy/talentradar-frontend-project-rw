import { ApiResponse } from "../types/response";
import { handleError, handleResponse } from "../utils";
import { RolesResponse } from "../types/role";

export async function getRoles(): Promise<ApiResponse<RolesResponse>> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/roles`, {
      credentials: "include",
    });
    return await handleResponse<RolesResponse>(res);
  } catch (error) {
    return handleError(error);
  }
}
