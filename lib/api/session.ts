import { Session, SessionResponse } from "../types/sessions";
import { FetchResponse } from "../types/response";
import { handleApiError } from "../utils";
import { sessions } from "../data/security-dashboard-data";

export async function getSessions(page:number = 1) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/sessions?page=${page}`,
    );
    const result: SessionResponse<Session[]> = await res.json();
    // const result: SessionResponse<Session[]> = {
    //   success: true,
    //   message: "Fetched sessions successfully",
    //   content: [
    //     {
    //       id: "s1",
    //       user_name: "Alice Johnson",
    //       user_id: "u1",
    //       ip_address: "192.168.0.101",
    //       device_info: "Chrome on Windows 10",
    //       is_active: true,
    //       session_id: "sess_abc123",
    //       created_at: "2024-10-01T09:15:00Z",
    //     },
    //     {
    //       id: "s2",
    //       user_name: "Bob Smith",
    //       user_id: "u2",
    //       ip_address: "172.16.5.20",
    //       device_info: "Safari on macOS",
    //       is_active: false,
    //       session_id: "sess_def456",
    //       created_at: "2024-10-01T10:45:00Z",
    //     },
    //     {
    //       id: "s3",
    //       user_name: "Charlie Lee",
    //       user_id: "u3",
    //       ip_address: "10.0.0.8",
    //       device_info: "Firefox on Ubuntu",
    //       is_active: true,
    //       session_id: "sess_ghi789",
    //       created_at: "2024-10-01T11:30:00Z",
    //     },
    //   ],
    //   pageable: {
    //     pageNumber: 0,
    //     pageSize: 10,
    //     sort: {
    //       empty: false,
    //       sorted: true,
    //       unsorted: false,
    //     },
    //     offset: 0,
    //     paged: true,
    //     unpaged: false,
    //   },
    //   last: false,
    //   totalPages: 5,
    //   totalElements: 50,
    //   size: 10,
    //   number: 0,
    //   first: true,
    //   numberOfElements: 3,
    //   sort: {
    //     empty: false,
    //     sorted: true,
    //     unsorted: false,
    //   },
    //   empty: false,
    // };

    // if (!res.ok) {
    //   return {
    //     success: false,
    //     message: result.message || "An unknown error occurred",
    //     content: null,
    //   };
    // }
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
