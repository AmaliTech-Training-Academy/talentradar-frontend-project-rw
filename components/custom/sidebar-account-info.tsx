"use client";
import { User } from "lucide-react";
import { LogoutCard } from "./logout-card";
import { useAppSelector } from "@/lib/hooks";

export const SidebarAccountInfo = () => {
  const user = useAppSelector((state) => state.auth);
  return (
    <div className="w-full flex gap-3 items-center justify-start bg-secondary-foreground/10 rounded-xl mb-3 p-2">
      <div className="flex gap-2 items-center w-full flex-1">
        <User
          size={40}
          strokeWidth={1.3}
          className=" rounded-full border bg-secondary"
        />
        <div className="w-full">
          {/* <p className="font-bold text-lg">Jane Doe</p> */}
          <p className="font-bold text-sm w-full ">
            {user.userName}
          </p>
          <p className="text-sm">{user.role}</p>
        </div>
      </div>
      
      <LogoutCard className="flex lg:hidden" />
    </div>
  );
};
