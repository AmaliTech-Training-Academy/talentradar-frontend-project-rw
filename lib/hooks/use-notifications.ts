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
        const res = await getAllNotifications();
        if (!res.success) throw new Error(res.message || "Failed to fetch notifications");
        setNotifications(res.result);
      } catch (err: any) {
        console.error("Notification fetch error:", err);
        setError(err.message || "Unknown error");
        toast.error(err.message);
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
        onStompError: (frame) => {
          console.error("STOMP error:", frame);
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