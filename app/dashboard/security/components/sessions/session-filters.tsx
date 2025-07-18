"use client";
import AppcomboBox from "@/app/dashboard/security/components/app-combo-box";
import { useSessionContext } from "@/components/providers/session-context-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUSerSessions } from "@/lib/api/session";
import { User } from "@/lib/types";
import { CalendarIcon } from "lucide-react";
import { useCallback, useState } from "react";

const SessionFilters = ({ users }: { users: User[] }) => {
  const sessionContext = useSessionContext();
  const { value, setValue } = sessionContext;
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");

  const handleUserSelect = useCallback(
    async ({ user, date }: { user?: string; date?: string } = {}) => {
      setValue({ ...value, loading: true, error: null });
      const filteredSessions = await getUSerSessions(user, date);
      setValue({ ...value, loading: false });
      if (filteredSessions.success && filteredSessions.content) {
        setValue({ ...value, sessions: filteredSessions.content || [] });
      } else {
        setValue({
          ...value,
          error: filteredSessions.message || "Failed to fetch sessions",
        });
      }
    },
    [setValue, value]
  );

  const handleDateChange = useCallback(
    (date: string) => {
      setSelectedDate(date);
      handleUserSelect({ date: date, user: selectedUser });
    },
    [handleUserSelect, selectedUser]
  );

  const handleUserChange = useCallback(
    (user: string) => {
      setSelectedUser(user);
      handleUserSelect({ user: user, date: selectedDate });
    },
    [handleUserSelect, selectedDate]
  );

  return (
    <div className="flex gap-2 flex-col sm:flex-row mb-5">
      <AppcomboBox
        users={users}
        onUserSelect={(userId) => {
          handleUserChange(userId);
        }}
      />
      <div className="relative w-full md:w-auto">
        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="date"
          className="pl-9 w-full"
          aria-label="Filter sessions from start date"
          placeholder="From Date"
          onChange={(e) => {
            handleDateChange(e.target.value);
          }}
          onKeyDown={(e) => e.preventDefault()}
          onPaste={(e) => e.preventDefault()}
        />
      </div>
      <Button variant="outline">Revoke All</Button>
    </div>
  );
};

export default SessionFilters;
