"use client";
import AppTable, { Column } from "@/components/custom/app-table";
import { Session, SessionPagination } from "@/lib/types/sessions";
import React, { useEffect, useState, useCallback } from "react";
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
  sessions: SessionPagination<Session>;
  users: User[];
}) => {
  const sessionContext = useSessionContext();
  const { value, setValue } = sessionContext;
  useEffect(() => {
    setValue((prev) => ({
      ...prev,
      sessions: sessions.items || [],
      loading: false,
      error: null,
    }));
  }, [setValue, sessions.items]);

  const { sessions: sessionsData, loading, error } = value;

  const [pageInfo, setPageInfo] = useState(() => ({
    page: sessions.pageable.pageNumber,
    size: sessions.pageable.pageSize,
    totalItems: sessions.totalElements,
    totalPages: sessions.totalPages,
    isFirst: sessions.first,
    isLast: sessions.last,
  }));

  const handlePageChange = useCallback(
    async (page: number) => {
      try {
        setPageInfo((prev) => ({ ...prev, page }));
        setValue((prev) => ({ ...prev, error: null, loading: true }));
        const sessionsResponse = await getSessions(page);

        if (!sessionsResponse.success) {
          setValue((prev) => ({
            ...prev,
            error: sessionsResponse.message,
            loading: false,
          }));
          return;
        }

        const newSessions = sessionsResponse.data;
        setValue((prev) => ({
          ...prev,
          sessions: newSessions.items || [],
          loading: false,
        }));

        setPageInfo({
          page: newSessions.pageable.pageNumber,
          size: newSessions.pageable.pageSize,
          totalItems: newSessions.totalElements,
          totalPages: newSessions.totalPages,
          isFirst: newSessions.first,
          isLast: newSessions.last,
        });
      } catch (error) {
        const errorMessage = handleError(error);
        setValue((prev) => ({
          ...prev,
          error: errorMessage.message,
          loading: false,
        }));
      }
    },
    [setValue]
  );

  if (error) {
    return <ErrorDiv error={error} />;
  }

  return (
    <>
      <SessionFilters users={users || []} />
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader className="mr-2 h-6 w-6 animate-spin" />
        </div>
      ) : (
        <div>
          <AppTable<Session>
            columns={sessionColumns}
            data={sessionsData}
            actionsLabel="Actions"
            renderActions={(session) => <SessionActions session={session} />}
          />
        </div>
      )}
      {pageInfo && pageInfo.totalPages > 1 && (
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
