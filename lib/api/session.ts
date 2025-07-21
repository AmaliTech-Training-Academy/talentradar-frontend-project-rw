import { Session, SessionPagination } from "../types/sessions";
import { ApiResponse } from "../types/response";
import { handleError, handleResponse } from "../utils";
import { getSessionsMock, getUSerSessionsMock } from "../mock/session";

const useMock = true;
export async function getSessions(
  page: number = 0
): Promise<ApiResponse<SessionPagination<Session>>> {
  if (useMock) {
    return getSessionsMock(page);
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/sessions?page=${page}`,
      { credentials: "include" }
    );
    return await handleResponse<SessionPagination<Session>>(res);
  } catch (error) {
    return handleError(error);
  }
}
export async function revokeSessions(
  id: string
): Promise<ApiResponse<{ success: boolean; message: string; data: null }>> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/sessions/${id}`,
      {
        method: "DELETE",
      }
    );
    return handleResponse<{ success: boolean; message: string; data: null }>(
      res
    );
  } catch (error) {
    return handleError(error);
  }
}

export async function getUSerSessions(
  userId?: string,
  date?: string
): Promise<ApiResponse<SessionPagination<Session>>> {
  if (useMock) {
    return getUSerSessionsMock(0, userId);
  }
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/sessions/filter?userId=${userId}&date=${date}`
    );
    return await handleResponse<SessionPagination<Session>>(res);
  } catch (error) {
    return handleError(error);
  }
}
