"use client";
import AppTable, { Column } from "@/components/custom/app-table";
import { Session, SessionResponse } from "@/lib/types/sessions";
import React, { useState } from "react";
import SessionActions from "./actions";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch } from "@/lib/hooks";
import { setPage } from "@/lib/features/paginationSlice";

const SessionsList = ({
  sessions,
}: {
  sessions: SessionResponse<Session[]>;
}) => {
  const dispatch = useAppDispatch();
  const [sessionsData, setSessions] = useState<Session[]>(sessions.content);
  const [pageInfo, setPageInfo] = useState({
    page: sessions.pageable.pageNumber - 1,
    size: sessions.pageable.pageSize,
    totalItems: sessions.totalElements,
    totalPages: sessions.totalPages,
    // hasNext: sessions.pageInfo?.hasNext,
    // hasPrevious: sessions.pageInfo?.hasPrevious,
    isFirst: sessions.first,
    isLast: sessions.last,
  });
  async function handlePageChange(page: number) {
    dispatch(setPage({ key: "session", page }));
    setPageInfo({ ...pageInfo, page });
    console.log(page + 1);
  }
  return (
    <div>
      <AppTable<Session>
        columns={sessionColumns}
        data={sessionsData}
        actionsLabel="Actions"
        renderActions={(session) => <SessionActions session={session} />}
      />
      {/* {pageInfo && (pageInfo.totalPages ?? 0) > 1 && (
        <div className="mt-6 flex justify-center">
          <PaginationControls
            pageInfo={pageInfo}
            onPageChange={handlePageChange}
          />
        </div>
      )} */}
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
