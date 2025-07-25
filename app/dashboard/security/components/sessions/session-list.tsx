"use client";
import AppTable from "@/components/custom/app-table";
import { Session, SessionPagination } from "@/lib/types/sessions";
import React, { useEffect } from "react";
import SessionActions from "./actions";
import { PaginationControls } from "@/components/custom/paginator-control";
import { getUSerSessions } from "@/lib/api/session";
import { handleError } from "@/lib/utils";
import ErrorDiv from "@/components/custom/ErrorDiv";
import { Loader } from "lucide-react";
import { User } from "@/lib/types";
import SessionFilters from "./session-filters";
import { useSessionContext } from "@/components/providers/session-context-provider";
import { sessionColumnsData } from "@/lib/constants/sessions";
import { Column } from "@/lib/types/app-table";

const SessionsList = ({
  sessions,
  users,
}: {
  sessions: SessionPagination<Session>;
  users: User[];
}) => {
  const sessionContext = useSessionContext();
  const { value, setValue } = sessionContext;
  const {
    userId,
    date,
    error: sessionError,
    loading: sessionLoading,
    sessions: sessionData,
    ...contextPageInfo
  } = value;

  useEffect(() => {
    const { items, ...sessionPageInfo } = sessions.data;
    setValue((prev) => ({
      ...prev,
      sessions: items || [],
      loading: false,
      error: null,
      ...sessionPageInfo,
    }));
  }, [sessions, setValue]);

  const handlePageChange = async (page: number) => {
    try {
      setValue((prev) => ({ ...prev, error: null, loading: true }));
      const sessionsResponse = await getUSerSessions(userId, date, page);
      if (!sessionsResponse.success) {
        setValue((prev) => ({
          ...prev,
          error: sessionsResponse.message,
          loading: false,
        }));
        return;
      }

      const { items, ...pInfo } = sessionsResponse.data.data;
      setValue((prev) => ({
        ...prev,
        userId,
        date,
        sessions: items || [],
        loading: false,
        page: pInfo.page,
        size: pInfo.size,
        totalElements: pInfo.totalElements,
        totalPages: pInfo.totalPages,
        hasNext: pInfo.hasNext,
        hasPrevious: pInfo.hasPrevious,
        error: null,
      }));
    } catch (error) {
      const errorMessage = handleError(error);
      setValue((prev) => ({
        ...prev,
        error: errorMessage.message,
        loading: false,
      }));
    }
  };

  if (sessionError) {
    return <ErrorDiv error={sessionError} />;
  }

  return (
    <>
      <SessionFilters users={users || []} />
      {sessionLoading ? (
        <div className="flex justify-center py-8">
          <Loader className="mr-2 h-6 w-6 animate-spin" />
        </div>
      ) : (
        <div>
          <AppTable<Session>
            columns={sessionColumns}
            data={sessionData}
            actionsLabel="Actions"
            renderActions={(session) => <SessionActions session={session} />}
          />
        </div>
      )}
      {contextPageInfo && contextPageInfo.totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <PaginationControls
            pageInfo={contextPageInfo}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export const sessionColumns: Column<Session>[] = sessionColumnsData
export default SessionsList;
