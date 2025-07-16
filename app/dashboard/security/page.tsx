import { InviteForm } from "./components/invite-form";
import React from "react";
import SessionsTable from "./components/sessions/sessions";
import StoreProvider from "@/app/StoreProvider";

export default function page() {
  return (
    <div className="">
      <InviteForm />
      <StoreProvider>
        <SessionsTable />
      </StoreProvider>
    </div>
  );
}
