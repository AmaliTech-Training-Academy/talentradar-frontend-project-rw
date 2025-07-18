import { INotification } from "../types/notification";
import { ApiResponse, PaginatedList } from "../types/response";
import { handleError, handleResponse } from "../utils";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

// Get all notifications
export const getAllNotifications = async (): Promise<
  ApiResponse<PaginatedList<INotification>>
> => {
  try {
    const res = await fetch(
      `${API_BASE}/notifications?status=UNREAD&category=ALL`,
      {
        credentials: "include",
      }
    );
    return await handleResponse<PaginatedList<INotification>>(res);
  } catch (err) {
    return handleError(err);
  }
};

// Mark notification as read
export const markNotificationAsRead = async (
  id: string
): Promise<ApiResponse<INotification>> => {
  try {
    const res = await fetch(`${API_BASE}/notifications/${id}/read`, {
      method: "PATCH",
      credentials: "include",
    });
    return await handleResponse<INotification>(res);
  } catch (err) {
    return handleError(err);
  }
};

// Dismiss notification
export const dismissNotificationById = async (
  id: string
): Promise<ApiResponse<INotification>> => {
  try {
    const res = await fetch(`${API_BASE}/notifications/${id}/dismiss`, {
      method: "PATCH",
      credentials: "include",
    });
    return await handleResponse<INotification>(res);
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
      eventType: "FEEDBACK",
      title: "New feedback",
      content: "Your manager has submitted new feedback",
      sentAt: "2025-07-15T10:30:00Z",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440001",
      category: "WARNING",
      eventType: "FEEDBACK",
      title: "New feedback",
      content: "Your manager has submitted new feedback",
      sentAt: "2025-07-15T10:30:00Z",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440002",
      category: "ERROR",
      eventType: "FEEDBACK",
      title: "New feedback",
      content: "Your manager has submitted new feedback",
      sentAt: "2025-07-15T10:30:00Z",
      readAt: "2025-07-15T10:30:00Z",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440003",
      category: "INFO",
      eventType: "FEEDBACK",
      title: "New feedback",
      content: "Your manager has submitted new feedback",
      sentAt: "2025-07-15T10:30:00Z",
      readAt: "2025-07-15T10:30:00Z",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440004",
      category: "SUCCESS",
      eventType: "FEEDBACK",
      title: "New feedback",
      content: "Your manager has submitted new feedback",
      sentAt: "2025-07-15T10:30:00Z",
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440005",
      category: "INFO",
      eventType: "FEEDBACK",
      title: "New feedback",
      content: "Your manager has submitted new feedback",
      sentAt: "2025-07-15T10:30:00Z",
    },
  ];

  return {
    success: true,
    data: notifications,
  };
};

export const mockMarkNotificationAsRead = async (
  id: string
): Promise<ApiResponse<{ id: string }>> => {
  return {
    success: true,
    data: { id },
    message: "Notification marked as read",
  };
};

export const mockDismissNotificationById = async (
  id: string
): Promise<ApiResponse<{ id: string }>> => {
  return {
    success: true,
    data: { id },
    message: "Notification marked as read",
  };
};