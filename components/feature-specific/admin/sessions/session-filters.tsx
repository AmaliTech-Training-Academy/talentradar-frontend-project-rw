"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon, Trash2, UserIcon } from "lucide-react";
import React from "react";

const SessionFilters = () => {
  return (
    <div className="flex gap-2 flex-col sm:flex-row">
      <div className="relative w-full md:w-auto">
        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Filter by User ID..."
          // value={userIdFilter}
          // onChange={(e) => setUserIdFilter(e.target.value)}
          className="pl-9 w-full"
          aria-label="Filter sessions by user ID"
        />
      </div>
      <div className="relative w-full md:w-auto">
        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="date"
          //   value={startDateFilter}
          //   onChange={(e) => setStartDateFilter(e.target.value)}
          className="pl-9 w-full"
          aria-label="Filter sessions from start date"
        />
      </div>
      <Button
        // onClick={handleRevokeAllSessions}
        variant="outline"
      >
        Revoke All
      </Button>
    </div>
  );
};

export default SessionFilters;
