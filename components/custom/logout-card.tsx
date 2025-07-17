import {
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

export const LogoutCard = () => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="hidden lg:block text-destructive hover:text-destructive"
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
