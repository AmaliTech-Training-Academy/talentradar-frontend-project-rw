"use client";
import {
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { Button } from "../ui/button";
import { Loader, LogOut } from "lucide-react";
import { useAppDispatch } from "@/lib/hooks";
import { clearUser } from "@/lib/features/authSlice";
import { cn } from "@/lib/utils";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

export const LogoutCard = ({ className }: { className?: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const handleSignOut = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/logout`
      );
      if (!res.ok) {
        throw new Error("Failed to log out");
      }
      await signOut({ redirectTo: "/login" });
      dispatch(clearUser());
      setIsLoading(false);
    } catch (error) {
      toast.error("An error occurred while logging out.");
      console.error("Logout error:", error);
      setIsLoading(false);
      return;
    }
  };
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className={cn(
            "hidden lg:flex text-destructive hover:text-destructive",
            className
          )}
          onClick={handleSignOut}
        >
          {isLoading ? (
            <Loader strokeWidth={1.5} size={24} className="animate-spin" />
          ) : (
            <LogOut />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent className=" text-destructive bg-destructive/10 border border-destructive p-1 text-sm m-2 rounded-sm">
        Logout
      </TooltipContent>
    </Tooltip>
  );
};
