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
          id: "c5358b3c-b381-4fbc-815c-deb4c104d9d5",
          sessionId: "be6d5570-872e-4a8a-9811-f9367e3c941d",
          ipAddress: "0:0:0:0:0:0:0:1",
          deviceInfo: "PostmanRuntime/7.44.1",
          createdAt: "2025-07-16T15:25:43.169664",
          user: {
            id: "778f412a-aa62-46bb-975d-8d7740fe32db",
            fullName: "Admin User",
            email: "admin@example.com",
          },
          active: true,
        },
        {
          id: "b2074858-b489-440e-a822-73bd49319743",
          sessionId: "84d30ad4-2424-4872-928a-155c04581979",
          ipAddress: "0:0:0:0:0:0:0:1",
          deviceInfo: "PostmanRuntime/7.44.1",
          createdAt: "2025-07-16T18:23:09.869576",
          user: {
            id: "778f412a-aa62-46bb-975d-8d7740fe32db",
            fullName: "Admin User",
            email: "admin@example.com",
          },
          active: true,
        },
        {
          id: "728c6e05-2149-4f7c-8447-09754b20e137",
          sessionId: "4990d9d4-7da3-4d12-9f92-2b4ad6dbb95f",
          ipAddress: "0:0:0:0:0:0:0:1",
          deviceInfo: "PostmanRuntime/7.44.1",
          createdAt: "2025-07-16T14:54:46.622092",
          user: {
            id: "778f412a-aa62-46bb-975d-8d7740fe32db",
            fullName: "Admin User",
            email: "admin@example.com",
          },
          active: true,
        },
        {
          id: "1ae6caf8-ba9f-428e-92fe-4e4ab76a8284",
          sessionId: "99514637-fb3a-4d56-a421-549ddeda8f66",
          ipAddress: "0:0:0:0:0:0:0:1",
          deviceInfo: "PostmanRuntime/7.44.1",
          createdAt: "2025-07-17T08:27:11.721344",
          user: {
            id: "778f412a-aa62-46bb-975d-8d7740fe32db",
            fullName: "Admin User",
            email: "admin@example.com",
          },
          active: true,
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
