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
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export const LogoutCard = ({ className }: { className?: string }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
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
          onClick={() => {
            router.push("/login");
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
