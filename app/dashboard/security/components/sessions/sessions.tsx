import ErrorDiv from "@/components/custom/ErrorDiv";
import { getSessions } from "@/lib/api/session";
import SessionFilters from "./session-filters";
import SessionsList from "./session-table";

export const SessionsTable = async () => {
  const sessions = await getSessions();
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
        <SessionFilters />
      </div>
      <SessionsList sessions={sessions.data || []} />
    </div>
  );
};

export default SessionsTable;
