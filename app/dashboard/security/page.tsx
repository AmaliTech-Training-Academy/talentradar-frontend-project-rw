import { Users } from "lucide-react";
import { StatCard } from "../components/stat-card";
import { InviteForm } from "./components/invite-form";
import { SecurityTabs } from "@/app/dashboard/security/components/security-tabs";
import { WelcomeCard } from "./components/welcome-card";

export default function page() {
  return (
    <div className="w-full space-y-3">
      <WelcomeCard />
      <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }, (_) => crypto.randomUUID()).map((id) => (
          <StatCard
            key={id}
            statInfo={{
              title: "Favor Eliab",
              desc: "the new configurations",
              color: "primary",
              stat: "123",
              icon: Users,
            }}
          />
        ))}
      </section>
      <SecurityTabs />
    </div>
  );
}
