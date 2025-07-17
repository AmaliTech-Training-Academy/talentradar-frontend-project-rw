import { InviteForm } from "./components/invite-form";
import React from "react";
import Sessions from "./components/sessions/sessions";

export default function page() {
  return (
    <div className="">
      <InviteForm />
        <Sessions />
    </div>
  );
}
