import { InviteForm } from "./components/invite-form";
import { SecurityTabs } from "@/app/dashboard/security/components/security-tabs";

export default function page() {
  return (
    <div className="w-full space-y-3">
      <InviteForm />
      <SecurityTabs />
    </div>
  );
}
