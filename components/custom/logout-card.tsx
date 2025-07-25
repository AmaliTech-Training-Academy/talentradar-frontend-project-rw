"use client";
import {
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { useAppDispatch } from "@/lib/hooks";
import { clearUser } from "@/lib/features/authSlice";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";

export const LogoutCard = ({ className }: { className?: string }) => {
  const dispatch = useAppDispatch();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className={cn(
            "hidden lg:block text-destructive hover:text-destructive",
            className
          )}
          onClick={async () => {
            await signOut({ redirectTo: "/login" });
            await fetch("/api/set-token", { method: "DELETE" });
            dispatch(clearUser());
          }}
        >
          <LogOut />
        </Button>
      </TooltipTrigger>
      <TooltipContent className=" text-destructive bg-destructive/10 border border-destructive p-1 text-sm m-2 rounded-sm">
        Logout
      </TooltipContent>
    </Tooltip>
  );
};
