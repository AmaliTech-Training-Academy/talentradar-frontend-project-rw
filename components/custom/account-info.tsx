"use client";

import { Bell, LogOut,  User } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { INotification } from "@/lib/types/notification";
import { getAllNotifications } from "@/lib/api/notification";
import { toast } from "sonner";

export const AccountInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [notifications, setNotifications] = useState<INotification[]>([]);

  // useEffect(() => {
  //   const fetchNotifications = async () => {
  //     const data = await getAllNotifications();
  //     if(!data.success) toast.error(data.message);
  //     setNotifications(notifications);
  //   }

  //   fetchNotifications();
  // }, [isOpen]);

  // const notifications = [];

  const notifications = [];

  return (
    <div className=" hidden lg:flex gap-3 items-center justify-start">
      <div className="relative cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <Bell size={25} />
        <p className="absolute -top-2 -right-1 bg-destructive text-xs text-white rounded-full flex items-center justify-center gap-2 h-5 w-5">
          {notifications.length}
        </p>
      </div>
      <div className="flex gap-2 items-center">
        <User
          size={40}
          strokeWidth={1.3}
          className=" rounded-full border bg-secondary"
        />
        <div>
          <p className="font-bold text-lg">Jane Doe</p>
          <p className="text-xs">Developer</p>
        </div>
      </div>
      <Button
        variant={"ghost"}
        size={"icon"}
        className="text-destructive hover:text-destructive"
      >
        <LogOut />
      </Button>
    </div>
  );
};
