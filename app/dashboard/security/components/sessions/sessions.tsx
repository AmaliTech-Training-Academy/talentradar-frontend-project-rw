"use client";
import AppTable from "@/components/custom/app-table";
import ErrorDiv from "@/components/custom/ErrorDiv";
import { getSessions } from "@/lib/api/session";
import SessionActions from "./actions";
import { Badge } from "@/components/ui/badge";
import SessionFilters from "./session-filters";
import { PaginationControls } from "@/components/custom/paginator-control";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setPage } from "@/lib/features/paginationSlice";

// const SessionsTable = async () => {
const SessionsTable =  () => {
  const dispatch = useAppDispatch();
  const p= useAppSelector(state =>state.pagination)
  const [pageInfo, setPageInfo] = useState({
    page: p["session"] || 0,
    size: 10,
    totalItems: 100,
    totalPages: 10,
    hasNext: true,
    hasPrevious: false,
    isFirst: true,
    isLast: false,
  });
  const sessions = [
    {
      id: "sess_001",
      user_id: "user_001",
      user_name: "John Doe",
      ip_address: "192.168.1.101",
      device_info: "Chrome on Windows 10",
      is_active: true,
      session_id: "a1b2c3d4e5",
      created_at: "2025-07-14T10:30:00Z",
    },
    {
      id: "sess_002",
      user_id: "user_002",
      user_name: "John Doe",
      ip_address: "172.16.0.22",
      device_info: "Firefox on Ubuntu 22.04",
      is_active: false,
      session_id: "f6g7h8i9j0",
      created_at: "2025-07-13T16:45:00Z",
    },
    {
      id: "sess_003",
      user_id: "user_001",
      user_name: "John Doe",
      ip_address: "10.0.0.3",
      device_info: "Safari on macOS Ventura",
      is_active: false,
      session_id: "k1l2m3n4o5",
      created_at: "2025-07-12T09:15:00Z",
    },
    {
      id: "sess_004",
      user_id: "user_003",
      user_name: "John Doe",
      ip_address: "192.168.0.55",
      device_info: "Edge on Windows 11",
      is_active: true,
      session_id: "p6q7r8s9t0",
      created_at: "2025-07-14T13:20:00Z",
    },
    {
      id: "sess_005",
      user_id: "user_004",
      user_name: "John Doe",
      ip_address: "203.0.113.12",
      device_info: "Mobile Safari on iPhone 14",
      is_active: true,
      session_id: "u1v2w3x4y5",
      created_at: "2025-07-15T08:00:00Z",
    },
  ];
  async function handlePageChange(page: number) {
    console.log(page+1)
    dispatch(setPage({ key: "session", page }));
    setPageInfo({ ...pageInfo, page });
  }

  // const sessions = await getSessions();
  // if (!sessions.success) return <ErrorDiv error={sessions.message} />;
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

      <AppTable
        columns={sessionColumns}
        // data={sessions.data || []}
        data={sessions}
        actionsLabel="Actions"
        renderActions={(session) => <SessionActions session={session} />}
      />
      {pageInfo && pageInfo.totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <PaginationControls
            pageInfo={pageInfo}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

export const sessionColumns = [
  { key: "user_name", label: "User" },
  { key: "device_info", label: "Device" },
  { key: "ip_address", label: "IP Address" },
  {
    key: "created_at",
    label: "Created At",
    render: (value: any) => new Date(value).toLocaleString(),
  },
  {
    key: "is_active",
    label: "Status",
    render: (value: any) =>
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
