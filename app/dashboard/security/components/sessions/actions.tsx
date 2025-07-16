"use client";
import { Session } from "@/lib/types/sessions";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Loader, MoreVertical } from "lucide-react";
import { revokeSessions } from "@/lib/api/session";
import { toast } from "sonner";

const SessionActions = ({ session }: { session: Session }) => {
  const [loading, setLoading] = useState<boolean>(false);
  async function revokeSession() {
    setLoading(true);
    const response = await revokeSessions(session.id);
    if (response.success) {
      toast.success(response.message || "Session revoked successfully");
    } else {
      toast.error(response.message || "Failed to revoke session");
    }
    setLoading(false);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button>
          {loading ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <MoreVertical className="w-4 h-4" />
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer" onClick={revokeSession}>
          Revoke session
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SessionActions;
