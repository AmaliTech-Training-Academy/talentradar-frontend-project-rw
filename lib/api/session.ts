import { Session } from "../types/sessions";
import { FetchResponse } from "../types/response";
import { handleApiError } from "../utils";

export async function getSessions() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/sessions`
    );
    const result: FetchResponse<Session[]> = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: result.message || "An unknown error occurred",
        data: null,
      };
    }
    return result;
  } catch (error) {
    return handleApiError(error);
  }
}
export async function revokeSessions(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/sessions/${id}`,
      {
        method: "DELETE",
      }
    );
    const result: FetchResponse<null> = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: result.message || "An unknown error occurred",
        data: null,
      };
    }
    return result;
  } catch (error) {
    return handleApiError(error);
  }
}
