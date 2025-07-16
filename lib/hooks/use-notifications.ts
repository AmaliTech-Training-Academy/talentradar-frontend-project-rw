'use client';

import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { toast } from "sonner";
import { INotification } from "@/lib/types/notification";
import { getAllNotifications } from "@/lib/api/notification";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stompClient: Client;

    const fetchInitial = async () => {
      try {
        const getNotificationResponse = await getAllNotifications();
        if (!getNotificationResponse.success) throw new Error(getNotificationResponse.message || "Failed to fetch notifications");
        setNotifications(getNotificationResponse.result);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    const connectSocket = () => {
      const socket = new SockJS('/ws-notifications', undefined, {
        // @ts-ignore
        withCredentials: true,
      });

      stompClient = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 5000,
        onConnect: () => {
          stompClient.subscribe('/user/queue/notifications', (message) => {
            const newNotification: INotification = JSON.parse(message.body);
            setNotifications((prev) => [newNotification, ...prev]);
            toast.info("New notification received");
          });
        },
        onStompError: () => {
          setError("WebSocket error");
          toast.error("WebSocket connection failed");
        },
      });

      stompClient.activate();
    };

    fetchInitial();
    connectSocket();

    return () => {
      stompClient?.deactivate();
    };
  }, []);

  return {
    notifications,
    loading,
    error,
  };
};