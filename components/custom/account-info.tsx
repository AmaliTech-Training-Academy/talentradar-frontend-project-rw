"use client";

import { User } from "lucide-react";
import { NotificationDropdown } from "./notification-dropdown";
import { LogoutCard } from "./logout-card";
import { useAppSelector } from "@/lib/hooks";

export const AccountInfo = () => {
  const user = useAppSelector((state) => state.auth);
  return (
    <div className="flex gap-3 items-center justify-start">
      {user.isAuthenticated && (
        <>
          <NotificationDropdown />
          <div className="hidden lg:flex gap-2 items-center">
            <User
              size={40}
              strokeWidth={1.3}
              className=" rounded-full border bg-secondary"
            />
            <div>
              <p className="font-bold text-lg">{user.userName}</p>
              <p className="text-xs">{user.role}</p>
            </div>
          </div>
          <LogoutCard />
        </>
      )}
    </div>
  );
};
