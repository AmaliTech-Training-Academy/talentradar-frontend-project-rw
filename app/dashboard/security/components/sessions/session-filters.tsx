"use client";
import AppcomboBox from "@/app/dashboard/security/components/app-combo-box";
import { useSessionContext } from "@/components/providers/session-context-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUSerSessions } from "@/lib/api/session";
import { User } from "@/lib/types";
import { CalendarIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const SessionFilters = ({ users }: { users: User[] }) => {
  const { value, setValue } = useSessionContext();
  const [localFilters, setLocalFilters] = useState({
    userId: value.userId,
    date: value.date,
  });

  const fetchSessions = useCallback(async (userId: string, date: string) => {
    setValue((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const filteredSessions = await getUSerSessions(userId, date, 0);

      if (filteredSessions.success && filteredSessions.data) {
        const { items, ...pageInfo } = filteredSessions.data.data;

        setValue((prev) => ({
          ...prev,
          loading: false,
          sessions: items || [],
          userId,
          date,
          ...pageInfo,
        }));
      } else {
        setValue((prev) => ({
          ...prev,
          loading: false,
          error: filteredSessions.message || "Failed to fetch sessions",
        }));
      }
    } catch (error) {
      setValue((prev) => ({
        ...prev,
        loading: false,
        error: `${error || "Failed to fetch sessions"}`,
      }));
    }
  }, [setValue]);

  useEffect(() => {
    fetchSessions(localFilters.userId, localFilters.date);
  }, [localFilters,fetchSessions]);

  const handleUserChange = useCallback((userId: string) => {
    setLocalFilters((prev) => ({ ...prev, userId }));
  }, []);

  const handleDateChange = useCallback((date: string) => {
    setLocalFilters((prev) => ({ ...prev, date }));
  }, []);

  return (
    <div className="flex gap-2 flex-col sm:flex-row mb-5">
      <AppcomboBox users={users} onUserSelect={handleUserChange} />
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
