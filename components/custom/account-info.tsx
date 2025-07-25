"use client";

import { User } from "lucide-react";
import { NotificationDropdown } from "./notification-dropdown";
import { LogoutCard } from "./logout-card";
import { useSession } from "next-auth/react";
export const AccountInfo = () => {
  const {data: sessionData} = useSession();
  return (
    <div className="flex gap-3 items-center justify-start">
      {sessionData && (
        <>
          <NotificationDropdown />
          <div className="hidden lg:flex gap-2 items-center">
            <User
              size={40}
              strokeWidth={1.3}
              className=" rounded-full border bg-secondary"
            />
            <div>
              <p className="font-bold text-lg">{sessionData.user.fullName}</p>
              <p className="text-xs">{sessionData.user.role}</p>
            </div>
          </div>
          <LogoutCard />
        </>
      )}
    </div>
  );
};
