import { Users } from "lucide-react";
import { StatCard } from "../components/stat-card";
import { SecurityTabs } from "@/app/dashboard/security/components/security-tabs";
import { WelcomeCard } from "./components/welcome-card";
import { getRoles } from "@/lib/api/role";
import { Suspense } from "react";

export default function page() {
  const roles = getRoles();
  return (
    <div className="w-full space-y-3">
      <Suspense fallback={<div>Loading...</div>}>
        <WelcomeCard roles={roles} />
      </Suspense>
      <section className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }, () => crypto.randomUUID()).map((id) => (
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
