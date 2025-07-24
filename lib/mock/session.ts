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
          items: paginated,
          pageable: {
            pageNumber: page,
            pageSize: 20,
            sort: {
              empty: true,
              sorted: false,
              unsorted: true,
            },
            offset: 0,
            paged: true,
            unpaged: false,
          },
          last: false,
          totalElements: 15,
          totalPages: 3,
          size: 20,
          number: 0,
          first: true,
          numberOfElements: 15,
          sort: {
            empty: true,
            sorted: false,
            unsorted: true,
          },
          empty: false,
        },
      });
    }, 300);
  });
}
export async function getUSerSessionsMock(
  page: number = 0,
  user: string = "1"
): Promise<ApiResponse<SessionPagination<Session>>> {
  const pageSize = 10;
  console.log(page,pageSize)
  let paginated = sessions.slice(0, 1);
  if (user === "1") paginated = [];
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          items: paginated,
          pageable: {
            pageNumber: 0,
            pageSize: 20,
            sort: {
              empty: true,
              sorted: false,
              unsorted: true,
            },
            offset: 0,
            paged: true,
            unpaged: false,
          },
          last: true,
          totalElements: 15,
          totalPages: 1,
          size: 20,
          number: 0,
          first: true,
          numberOfElements: 15,
          sort: {
            empty: true,
            sorted: false,
            unsorted: true,
          },
          empty: false,
        },
      });
    }, 300);
  });
}
