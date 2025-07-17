import AppTable, { Column } from "@/components/custom/app-table";
import ErrorDiv from "@/components/custom/ErrorDiv";
import { getSessions } from "@/lib/api/session";
import SessionActions from "./actions";
import { Badge } from "@/components/ui/badge";
import SessionFilters from "./session-filters";
<<<<<<< HEAD
=======
import { Column } from "@/components/custom/app-table";
>>>>>>> 536a711bbc304d82954a285ccf803b7800299e5f
import { Session } from "@/lib/types/sessions";

const SessionsTable = async () => {
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

      <AppTable<Session>
        columns={sessionColumns}
        data={sessions.data || []}
        actionsLabel="Actions"
        renderActions={(session) => <SessionActions session={session} />}
      />
    </div>
  );
};

export const sessionColumns: Column<Session>[] = [
  { key: "user_name", label: "User" },
  { key: "device_info", label: "Device" },
  { key: "ip_address", label: "IP Address" },
  {
    key: "created_at",
    label: "Created At",
    render: (value) => new Date(value as string).toLocaleString(),
  },
  {
    key: "is_active",
    label: "Status",
    render: (value) =>
      value ? (
        <Badge variant="outline" className="text-green">
          Active
        </Badge>
      ) : (
        <Badge variant="outline" className="text-destructive">
          Inactive
        </Badge>
      ),
  },
];
export default SessionsTable;
