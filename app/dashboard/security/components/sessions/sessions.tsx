import React from "react";
import SessionsTable from "./sessions-table";
import StoreProvider from "@/app/StoreProvider";
import { getSessions } from "@/lib/api/session";
import ErrorDiv from "@/components/custom/ErrorDiv";

const Sessions = async () => {
  const sessions = await getSessions();
  if (!sessions.success || sessions.data === null)
    return <ErrorDiv error={sessions.message} />;
  return (
    <div className="p-5">
      <div className="mb-5">
        <h1 className="text-2xl font-bold">Session Management</h1>
        <p className="text-sm text-muted-foreground">
          Manage and monitor active user sessions.
        </p>
      </div>
      <StoreProvider>
        <SessionsTable sessions={sessions} />
      </StoreProvider>
    </div>
  );
};

export default Sessions;
