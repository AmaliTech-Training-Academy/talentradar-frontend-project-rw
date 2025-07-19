import ErrorDiv from "@/components/custom/ErrorDiv";
import { getSessions } from "@/lib/api/session";
import SessionsList from "./session-list";
import { getAllUsers } from "@/lib/api/user";
import { SessionProvider } from "@/components/providers/session-context-provider";

export const SessionsTable = async () => {
  const sessions = await getSessions();
  const users = await getAllUsers();
  if (!users.success) return <ErrorDiv error={users.message} />;
  if (!sessions.success) return <ErrorDiv error={sessions.message} />;
  return (
    <div className="p-5">
      <div className="mb-5 flex flex-col md:flex-row  justify-start md:justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Session Management</h1>
          <p className="text-sm text-muted-foreground">
            Manage and monitor active user sessions.
          </p>
        </div>
      </div>
      <SessionProvider>
        <SessionsList
          sessions={sessions.data}
          users={users.data || []}
        />
      </SessionProvider>
    </div>
  );
};

export default SessionsTable;
