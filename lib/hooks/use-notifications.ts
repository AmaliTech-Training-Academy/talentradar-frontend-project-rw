"use client";

import { useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { toast } from "sonner";
import { INotification } from "@/lib/types/notification";
import {
  mockDismissNotificationById,
  mockGetAllNotifications,
  mockMarkNotificationAsRead
} from "@/lib/api/notification";
import {
  setNotifications,
  addNotification,
  markAsRead as markAsReadAction,
  dismissNotification as dismissAction,
  setLoading,
  setError
} from "@/lib/features/notificationSlice"
import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";

export const useNotifications = () => {
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector(
    (state: RootState) => state.notifications
  )

  const handleError = (err: unknown, defaultMessage: string) => {
    const message = err instanceof Error ? err.message : defaultMessage;
    dispatch(setError(message));
    toast.error(message);
  };

  useEffect(() => {
    let stompClient: Client;

    const fetchInitialNotifications = async () => {
      dispatch(setLoading(true));
      try {
        const response = await mockGetAllNotifications();
        if (!response.success) throw new Error("Failed to fetch notifications");
        dispatch(setNotifications(response.data));
      } catch (err) {
        handleError(err, "Failed to fetch notifications");
      } finally {
        dispatch(setLoading(false));
      }
    };

    const connectWebSocket = () => {
      const socket = new SockJS("/ws-notifications", undefined, {
        // @ts-expect-error SockJS types do not support withCredentials
        withCredentials: true,
      });

      stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        onConnect: () => {
          stompClient.subscribe("/user/queue/notifications", (message) => {
            try {
              const newNotification: INotification = JSON.parse(message.body);
              dispatch(addNotification(newNotification));
              toast.info("New notification received");
            } catch {
              toast.error("Failed to parse incoming notification");
            }
          });
        },
        onStompError: () => {
          handleError(
            "WebSocket connection error",
            "WebSocket connection failed"
          );
        },
      });

      stompClient.activate();
    };

    fetchInitialNotifications();
    connectWebSocket();

    return () => {
      stompClient?.deactivate();
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markAsRead = async (id: string) => {
    try {
      const response = await mockMarkNotificationAsRead(id);
      if (!response.success) throw new Error("Failed to mark notification as read");
      dispatch(markAsReadAction(id));
      toast.success("Notification marked as read");
    } catch (err) {
      handleError(err, "Failed to mark notification as read");
    }
  };

  const markAllAsRead = async () => {
    const unreadIds = notifications.filter(n => !n.readAt).map(n => n.id);
    await Promise.all(unreadIds.map(markAsRead));
  };

  const dismissNotification = async (id: string) => {
    try {
      const response = await mockDismissNotificationById(id);
      if (!response.success) throw new Error("Failed to dismiss notification");
      dispatch(dismissAction(id));
      toast.success("Notification dismissed");
    } catch (err) {
      handleError(err, "Failed to dismiss notification");
    }
  };

  return {
    notifications,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    dismissNotification
  };
};
