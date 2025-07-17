"use client";

import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { toast } from "sonner";
import { INotification } from "@/lib/types/notification";
import {
  // dismissNotificationById,
  // getAllNotifications,
  // markNotificationAsRead,
  mockDismissNotificationById,
  mockGetAllNotifications,
  mockMarkNotificationAsRead
} from "@/lib/api/notification";

const useErrorHandler = (setError: (msg: string) => void) => {
  return (err: unknown, defaultMessage: string) => {
    const message = err instanceof Error ? err.message : defaultMessage;
    setError(message);
    toast.error(message);
  };
};

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const handleError = useErrorHandler(setError);

  useEffect(() => {
    let stompClient: Client;

    const fetchInitialNotifications = async () => {
      try {
        const response = await mockGetAllNotifications();
        if (!response.success) throw new Error("Failed to fetch notifications");
        setNotifications(response.result);
      } catch (err) {
        handleError(err, "Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
    };

    const connectWebSocket = () => {
      const socket = new SockJS("/ws-notifications", undefined, {
        // @ts-expect-error SockJS types do not support withCredentials
        withCredentials: true
      });

      stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        onConnect: () => {
          stompClient.subscribe("/user/queue/notifications", (message) => {
            try {
              const newNotification: INotification = JSON.parse(message.body);
              setNotifications(prev => [newNotification, ...prev]);
              toast.info("New notification received");
            } catch {
              toast.error("Failed to parse incoming notification");
            }
          });
        },
        onStompError: () => {
          handleError("WebSocket connection error", "WebSocket connection failed");
        }
      });

      stompClient.activate();
    };

    fetchInitialNotifications();
    connectWebSocket();

    return () => {
      stompClient?.deactivate();
    };
  }, []);

  const markAsRead = async (id: string) => {
    try {
      const response = await mockMarkNotificationAsRead(id);
      if (!response.success) throw new Error("Failed to mark notification as read");

      setNotifications(prev =>
        prev.map(n =>
          n.id === id ? { ...n, read_at: new Date().toISOString() } : n
        )
      );

      toast.success("Notification marked as read");
    } catch (err) {
      handleError(err, "Failed to mark notification as read");
    }
  };

  const markAllAsRead = async () => {
    const unreadIds = notifications.filter(n => !n.read_at).map(n => n.id);
    await Promise.all(unreadIds.map(markAsRead));
  };

  const dismissNotification = async (id: string) => {
    try {
      const response = await mockDismissNotificationById(id);
      if (!response.success) throw new Error("Failed to dismiss notification");

      setNotifications(prev => prev.filter(n => n.id !== id));
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
