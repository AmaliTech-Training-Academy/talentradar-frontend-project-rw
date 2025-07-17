import { AlertCard } from "../alert-card";
import { RoleDistributionCard } from "./role-distribution-card";

export const SecurityAlerts = () => {
  return (
    <section className="w-full flex flex-col gap-2 mb-10">
      <p className="text-xl font-bold">Recent security alerts</p>
      <div className="w-full flex flex-col gap-3">
        {Array.from({ length: 3 }, () => crypto.randomUUID()).map((id) => (
          <AlertCard key={id} weight="low" />
        ))}
      </div>

      <p className="text-xl font-bold mt-2">User Role distribution</p>
      <div className="w-full gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 4 }, () => crypto.randomUUID()).map((id) => (
          <RoleDistributionCard key={id} />
        ))}
      </div>
    </section>
  );
};
