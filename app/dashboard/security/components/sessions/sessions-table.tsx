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
import { Session } from "@/lib/types/sessions";
import { FetchResponse } from "@/lib/types/response";
import { Column } from "@/lib/types/app-table";

const SessionsTable = ({
  sessions,
}: {
  sessions: FetchResponse<Session[]>;
}) => {
  const dispatch = useAppDispatch();
  const pagination = useAppSelector((state) => state.pagination);

  const [pageInfo, setPageInfo] = useState({
    page: (sessions.pageInfo?.page || 1) - 1,
    size: sessions.pageInfo?.size,
    totalItems: sessions.pageInfo?.totalItems,
    totalPages: sessions.pageInfo?.totalPages,
    hasNext: sessions.pageInfo?.hasNext,
    hasPrevious: sessions.pageInfo?.hasPrevious,
    isFirst: sessions.pageInfo?.isFirst,
    isLast: sessions.pageInfo?.isLast,
  });
  async function handlePageChange(page: number) {
    dispatch(setPage({ key: "session", page }));
    setPageInfo({ ...pageInfo, page });
    console.log(page+1)

  }
  return (
    <div>
      <div className="mb-5">
        <SessionFilters />
      </div>

      <AppTable<Session>
        columns={sessionColumns}
        data={sessions.data || []}
        actionsLabel="Actions"
        renderActions={(session) => <SessionActions session={session} />}
      />
      {pageInfo && (pageInfo.totalPages ?? 0) > 1 && (
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

export const sessionColumns:Column<Session>[] = [
  { key: "user_name", label: "User" },
  { key: "device_info", label: "Device" },
  { key: "ip_address", label: "IP Address" },
  {
    key: "created_at",
    label: "Created At",
    render: (value: string | boolean) => new Date(value as string).toLocaleString(),
  },
  {
    key: "is_active",
    label: "Status",
    render: (value: string| boolean) =>
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
