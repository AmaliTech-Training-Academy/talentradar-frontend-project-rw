"use client";
import AppTable, { Column } from "@/components/custom/app-table";
import { Session, SessionResponse } from "@/lib/types/sessions";
import React, { useState } from "react";
import SessionActions from "./actions";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch } from "@/lib/hooks";
import { PaginationControls } from "@/components/custom/paginator-control";
import { setPage } from "@/lib/features/paginationslice";
import { getSessions } from "@/lib/api/session";
import { handleError } from "@/lib/utils";
import ErrorDiv from "@/components/custom/ErrorDiv";
import { Loader } from "lucide-react";

const SessionsList = ({
  sessions,
}: {
  sessions: SessionResponse<Session[]>;
}) => {
  const dispatch = useAppDispatch();
  const [sessionsData, setSessions] = useState<Session[]>(sessions.content);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageInfo, setPageInfo] = useState({
    page: sessions.pageable.pageNumber,
    size: sessions.pageable.pageSize,
    totalItems: sessions.totalElements,
    totalPages: sessions.totalPages,
    isFirst: sessions.first,
    isLast: sessions.last,
  });
  async function handlePageChange(page: number) {
    dispatch(setPage({ key: "session", page: page }));
    setPageInfo({ ...pageInfo, page: page });
    setError(null);
    setLoading(true);
    try {
      const sessions = await getSessions(page);
      setSessions(sessions.content || []);
    } catch (error) {
      const errorMessage = handleError(error);
      setError(errorMessage.message);
    } finally {
      setLoading(false);
    }
  }

  if (error) {
    return <ErrorDiv error={error} />;
  }
  return (
    <>
      {!loading ? (
        <div>
          <AppTable<Session>
            columns={sessionColumns}
            data={sessionsData}
            actionsLabel="Actions"
            renderActions={(session) => <SessionActions session={session} />}
          />
        </div>
      ) : (
        <div className="flex justify-center">
          <Loader className="mr-2 h-6 w-6 animate-spin" />
        </div>
      )}
      {pageInfo && (pageInfo.totalPages ?? 0) > 1 && (
        <div className="mt-6 flex justify-center">
          <PaginationControls
            pageInfo={pageInfo}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export const sessionColumns: Column<Session>[] = [
  {
    key: "user",
    label: "User",
    render: (value) =>
      typeof value === "object" && ` (${value.email})`,
  },
  { key: "deviceInfo", label: "Device" },
  { key: "ipAddress", label: "IP Address" },
  {
    key: "createdAt",
    label: "Created At",
    render: (value) => new Date(value as string).toLocaleString(),
  },
  {
    key: "active",
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
