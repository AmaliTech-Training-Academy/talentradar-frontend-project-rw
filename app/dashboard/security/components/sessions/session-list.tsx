"use client";
import AppTable, { Column } from "@/components/custom/app-table";
import { Session, SessionResponse } from "@/lib/types/sessions";
import React, { useEffect, useState } from "react";
import SessionActions from "./actions";
import { Badge } from "@/components/ui/badge";
import { PaginationControls } from "@/components/custom/paginator-control";
import { getSessions } from "@/lib/api/session";
import { handleError } from "@/lib/utils";
import ErrorDiv from "@/components/custom/ErrorDiv";
import { Loader } from "lucide-react";
import { User } from "@/lib/types";
import SessionFilters from "./session-filters";
import { useSessionContext } from "@/components/providers/session-context-provider";

const SessionsList = ({
  sessions,
  users,
}: {
  sessions: SessionResponse<Session[]>;
  users: User[];
}) => {
  const sessionContext = useSessionContext();
  const { value, setValue } = sessionContext;
  useEffect(() => {
    setValue({
      ...value,
      sessions: sessions.content,
      loading: false,
      error: null,
    });
  }, []);
  const { sessions: sessionsData, loading, error } = value;
  const [pageInfo, setPageInfo] = useState({
    page: sessions.pageable.pageNumber,
    size: sessions.pageable.pageSize,
    totalItems: sessions.totalElements,
    totalPages: sessions.totalPages,
    isFirst: sessions.first,
    isLast: sessions.last,
  });
  async function handlePageChange(page: number) {
    setPageInfo({ ...pageInfo, page: page });
    setValue({ ...value, error: null, loading: true });
    try {
      const sessions = await getSessions(page);
      setValue({ ...value, sessions: sessions.content || [] });
    } catch (error) {
      const errorMessage = handleError(error);
      setValue({ ...value, error: errorMessage.message });
    } finally {
      setValue({ ...value, loading: false });
    }
  }

  if (error) {
    return <ErrorDiv error={error} />;
  }
  return (
    <>
      <SessionFilters users={users || []} />
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
    render: (value) => typeof value === "object" && ` (${value.email})`,
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
