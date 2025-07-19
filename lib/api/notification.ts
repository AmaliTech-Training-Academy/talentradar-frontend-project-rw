import { INotification } from "../types/notification";
import { ApiResponse, PaginatedList, Pagination } from "../types/response";
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
): Promise<ApiResponse<null>> => {
  try {
    const res = await fetch(`${API_BASE}/notifications/${id}/read`, {
      method: "PATCH",
      credentials: "include",
    });
    return await handleResponse<null>(res);
  } catch (err) {
    return handleError<null>(err);
  }
};

// Dismiss notification
export const dismissNotificationById = async (
  id: string
): Promise<ApiResponse<null>> => {
  try {
    const res = await fetch(`${API_BASE}/notifications/${id}/dismiss`, {
      method: "PATCH",
      credentials: "include",
    });
    return await handleResponse<null>(res);
  } catch (err) {
    return handleError<null>(err);
  }
};

// Get single notification
export const getNotificationById = async (
  id: string
): Promise<ApiResponse<{ item: INotification }>> => {
  try {
    const res = await fetch(`${API_BASE}/notifications/${id}`, {
      credentials: "include",
    });
    return await handleResponse<{ item: INotification }>(res);
  } catch (err) {
    return handleError(err);
  }
};

// Search notifications
export const searchNotifications = async (
  query: string
): Promise<ApiResponse<PaginatedList<INotification>>> => {
  try {
    const res = await fetch(`${API_BASE}/notifications/search?q=${query}`, {
      credentials: "include",
    });
    return await handleResponse<PaginatedList<INotification>>(res);
  } catch (err) {
    return handleError(err);
  }
};