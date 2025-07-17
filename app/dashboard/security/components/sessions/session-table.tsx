"use client";
import AppTable, { Column } from "@/components/custom/app-table";
import { Session } from "@/lib/types/sessions";
import React from "react";
import SessionActions from "./actions";
import { Badge } from "@/components/ui/badge";

const SessionsList = ({ sessions }: { sessions: Session[] }) => {
  return (
    <div>
      <AppTable<Session>
        columns={sessionColumns}
        data={sessions}
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
export default SessionsList;
