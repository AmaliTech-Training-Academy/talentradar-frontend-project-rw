"use client";
import { Session } from "@/lib/types/sessions";
import React, { createContext, useContext, useState } from "react";

export interface SessionContextType {
  sessions: Session[];
  loading: boolean;
  error: string | null;
}
interface MyContextType {
  value: SessionContextType;
  setValue: (
    val: SessionContextType | ((prev: SessionContextType) => SessionContextType)
  ) => void;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export const SessionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [value, setValue] = useState({
    sessions: [],
    loading: false,
    error: null,
  } as MyContextType["value"]);

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};

export const useSessionContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("sessionContext must be used within SessionProvider");
  }
  return context;
};
