import { Progress } from "@/components/ui/progress";

export const RoleDistributionCard = () => {
  return (
    <section className="w-full space-y-3 dark:bg-card bg-background p-3 rounded-lg">
      <div className="w-full gap-3 flex justify-between">
        <p>Developer</p>
        <p className="text-2xl text-primary font-bold">85</p>
      </div>
      <Progress
        value={10}
        className="w-full h-2 rounded-full accent-primary  text-primary"
      />
      <p className="text-sm text-foreground/50">54.4% of the total users</p>
    </section>
  );
};
