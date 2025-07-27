"use client";
import { useEffect, useState } from "react";
import ErrorDiv from "@/components/custom/ErrorDiv";
import { getSessions } from "@/lib/api/session";
import SessionsList from "./session-list";
import { getAllUsers } from "@/lib/api/user";
import { SessionProvider } from "@/components/providers/session-context-provider";
import { Loader } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCacheSessions, setCacheUsers } from "@/lib/features/sessionSlice";

export const SessionsTable = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { sessions: cachedSessions, users: cachedUsers } = useAppSelector(
    (state) => state.sessions
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchData = async () => {
      console.log(cachedSessions, cachedUsers);
      try {
        setLoading(true);
        setError(null);

        const [sessionsResponse, usersResponse] = await Promise.all([
          getSessions(),
          getAllUsers(),
        ]);

        if (!sessionsResponse.success || !usersResponse.success) {
          setError(
            sessionsResponse.message ||
              usersResponse.message ||
              "Failed to fetch data"
          );
          return;
        }
        dispatch(setCacheSessions(sessionsResponse.data));
        dispatch(setCacheUsers(usersResponse.data.data.users));
      } catch (err) {
        setError(`Failed to fetch data: ${err}`);
      } finally {
        setLoading(false);
      }
    };
    if (cachedSessions && cachedUsers) return;
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="p-5">
      <div className="mb-5 flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Session Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage and monitor active user sessions.
          </p>
        </div>
      </div>
      {loading && <Loader className="w-6 h-6 animate-spin mx-auto my-4" />}
      {error && <ErrorDiv error={error} />}
      {!loading && !error && cachedSessions && (
        <SessionProvider>
          <SessionsList sessions={cachedSessions} users={cachedUsers || []} />
        </SessionProvider>
      )}
    </div>
  );
};

export default SessionsTable;
