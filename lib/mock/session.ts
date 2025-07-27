import { sessions } from "../data/security-dashboard-data";
import { ApiResponse } from "../types/response";
import { Session, SessionPagination } from "../types/sessions";

export async function getSessionsMock(
  page: number = 0
): Promise<ApiResponse<SessionPagination<Session>>> {
  const pageSize = 2;
  const start = page * pageSize;
  const paginated = sessions.slice(start, start + pageSize);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          data: {
            items: paginated,
            page: page,
            size: 20,
            totalElements: 15,
            totalPages: 3,
            hasNext: true,
            hasPrevious: false,
          },
        },
      });
    }, 300);
  });
}
