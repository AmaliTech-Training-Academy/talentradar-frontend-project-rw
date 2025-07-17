import { Session } from "../types/sessions";
import { FetchResponse } from "../types/response";
import { handleApiError } from "../utils";

export async function getSessions(page: number = 1) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/sessions`
    );
    return {
      success: true,
      message: "Sessions fetched successfully",
      data: [
        {
          id: "sess_001",
          user_id: "user_001",
          user_name: "John Doe",
          ip_address: "192.168.1.101",
          device_info: "Chrome on Windows 10",
          is_active: true,
          session_id: "a1b2c3d4e5",
          created_at: "2025-07-14T10:30:00Z",
        },
        {
          id: "sess_002",
          user_id: "user_002",
          user_name: "John Doe",
          ip_address: "172.16.0.22",
          device_info: "Firefox on Ubuntu 22.04",
          is_active: false,
          session_id: "f6g7h8i9j0",
          created_at: "2025-07-13T16:45:00Z",
        },
        {
          id: "sess_003",
          user_id: "user_001",
          user_name: "John Doe",
          ip_address: "10.0.0.3",
          device_info: "Safari on macOS Ventura",
          is_active: false,
          session_id: "k1l2m3n4o5",
          created_at: "2025-07-12T09:15:00Z",
        },
        {
          id: "sess_004",
          user_id: "user_003",
          user_name: "John Doe",
          ip_address: "192.168.0.55",
          device_info: "Edge on Windows 11",
          is_active: true,
          session_id: "p6q7r8s9t0",
          created_at: "2025-07-14T13:20:00Z",
        },
        {
          id: "sess_005",
          user_id: "user_004",
          user_name: "John Doe",
          ip_address: "203.0.113.12",
          device_info: "Mobile Safari on iPhone 14",
          is_active: true,
          session_id: "u1v2w3x4y5",
          created_at: "2025-07-15T08:00:00Z",
        },
      ],
      pageInfo: {
        page: 1,
        size: 10,
        totalItems: 100,
        totalPages: 10,
        hasNext: true,
        hasPrevious: false,
        isFirst: true,
        isLast: false,
      },
    };
    // const result: FetchResponse<Session[]> = await res.json();
    // if (!res.ok) {
    //   return {
    //     success: false,
    //     message: result.message || "An unknown error occurred",
    //     data: null,
    //   };
    // }
    // return result;
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
