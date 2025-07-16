import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoutCard } from "./logout-card";

export const SidebarAccountInfo = () => {
  return (
    <div className="flex gap-3 items-center justify-start bg-secondary-foreground/10 rounded-xl mb-3 p-2">
      <div className="flex gap-2 items-center w-full">
        <User
          size={40}
          strokeWidth={1.3}
          className=" rounded-full border bg-secondary"
        />
        <div>
          <p className="font-bold text-lg">Jane Doe</p>
          <p className="text-sm">Developer</p>
        </div>
      </div>
      <LogoutCard />
    </div>
  );
};
