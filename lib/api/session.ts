import { Session, SessionResponse } from "../types/sessions";
import { ApiResponse } from "../types/response";
import { handleError } from "../utils";
// import { sessions } from "../data/security-dashboard-data";

export async function getSessions(page:number = 0) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/sessions?page=${page}`,
    );
    const result: SessionResponse<Session[]> = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "An unknown error occurred",
        content: null,
      };
    }
    return result;
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, message: error.message, content: null };
    }
    return {
      success: false,
      message: "Unexpected error occurred",
      content: null,
    };
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
    const result: ApiResponse<null> = await res.json();
    if (!res.ok) {
      return {
        success: false,
        message: result.message || "An unknown error occurred",
        data: null,
      };
    }
    return result;
  } catch (error) {
    return handleError(error);
  }
}
