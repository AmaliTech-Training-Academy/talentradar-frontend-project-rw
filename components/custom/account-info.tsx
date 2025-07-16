"use client";

import { Bell, LogOut, User } from "lucide-react";
import { Button } from "../ui/button";
import { NotificationDropdown } from "./notification-dropdown";

export const AccountInfo = () => {
  return (
    <div className=" hidden lg:flex gap-3 items-center justify-start">
      <NotificationDropdown />
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
