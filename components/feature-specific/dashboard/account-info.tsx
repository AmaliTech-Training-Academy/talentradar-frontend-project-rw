import { Bell, LogOut,  User } from "lucide-react";
import { Button } from "../../ui/button";

export const AccountInfo = () => {
  return (
    <div className=" hidden lg:flex gap-3 items-center justify-start">
      <div className="relative">
        <Bell size={25} />
        <p className="absolute -top-2 -right-1 bg-destructive text-xs text-white rounded-full flex items-center justify-center gap-2 h-5 w-5">
          10
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
