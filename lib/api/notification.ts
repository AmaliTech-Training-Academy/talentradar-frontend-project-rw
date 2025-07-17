import { INotification } from "../types/notification";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

type SuccessResponse<T> = { success: true; result: T };
type ErrorResponse = { success: false; message: string };
type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

// ---- Handle fetch response ----
const handleResponse = async <T>(res: Response): Promise<ApiResponse<T>> => {
  const data = await res.json();
  if (!res.ok) {
    const message = data.message ?? "An unknown error occurred";
    return { success: false, message };
  }
  return { success: true, result: data };
};

// ---- Handle errors ----
const handleError = (err: unknown): ErrorResponse => {
  const message =
    err instanceof Error ? err.message : "An unknown error occurred";
  return { success: false, message };
};

// ---- API: Get all notifications ----
export const getAllNotifications = async (): Promise<
  ApiResponse<INotification[]>
> => {
  try {
    const res = await fetch(
      `${API_BASE}/notifications?status=UNREAD&category=ALL`,
      {
        credentials: "include",
      }
    );
    return await handleResponse<INotification[]>(res);
  } catch (err) {
    return handleError(err);
  }
};

// ---- API: Mark notification as read ----
export const markNotificationAsRead = async (
  id: string
): Promise<ApiResponse<{ id: string }>> => {
  try {
    const res = await fetch(`${API_BASE}/notifications/${id}/read`, {
      method: "PATCH",
      credentials: "include",
    });
    return await handleResponse<{ id: string }>(res);
  } catch (err) {
    return handleError(err);
  }
};

// ---- API: Dismiss notification ----
export const dismissNotificationById = async (
  id: string
): Promise<ApiResponse<{ id: string }>> => {
  try {
    const res = await fetch(`${API_BASE}/notifications/${id}/dismiss`, {
      method: "PATCH",
      credentials: "include",
    });
    return await handleResponse<{ id: string }>(res);
  } catch (err) {
    return handleError(err);
  }
};

export const mockGetAllNotifications = async (): Promise<
  ApiResponse<INotification[]>
> => {
  const notifications: INotification[] = [
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      category: "SUCCESS",
      event_type: "FEEDBACK",
      title: "New feedback",
      content: "Your manager has submitted new feedback",
      sent_at: "2025-07-15T10:30:00Z",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440001",
      category: "WARNING",
      event_type: "FEEDBACK",
      title: "New feedback",
      content: "Your manager has submitted new feedback",
      sent_at: "2025-07-15T10:30:00Z",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440002",
      category: "ERROR",
      event_type: "FEEDBACK",
      title: "New feedback",
      content: "Your manager has submitted new feedback",
      sent_at: "2025-07-15T10:30:00Z",
      read_at: "2025-07-15T10:30:00Z",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440003",
      category: "INFO",
      event_type: "FEEDBACK",
      title: "New feedback",
      content: "Your manager has submitted new feedback",
      sent_at: "2025-07-15T10:30:00Z",
      read_at: "2025-07-15T10:30:00Z",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440004",
      category: "SUCCESS",
      event_type: "FEEDBACK",
      title: "New feedback",
      content: "Your manager has submitted new feedback",
      sent_at: "2025-07-15T10:30:00Z",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440005",
      category: "INFO",
      event_type: "FEEDBACK",
      title: "New feedback",
      content: "Your manager has submitted new feedback",
      sent_at: "2025-07-15T10:30:00Z",
    },
  ];

  return {
    success: true,
    result: notifications,
  };
};

export const mockMarkNotificationAsRead = async (
  id: string
): Promise<ApiResponse<{ id: string }>> => {
  return {
    success: true,
    result: { id },
  };
};

export const mockDismissNotificationById = async (
  id: string
): Promise<ApiResponse<{ id: string }>> => {
  return {
    success: true,
    result: { id },
  };
};