import { cn } from "@/lib/utils";
import { CheckCircle, TriangleAlert } from "lucide-react";
import React, { FC } from "react";

export const SecurityAlerts = () => {
  return (
    <div className="w-full flex flex-col gap-2 mb-10">
      <p className="text-xl font-bold">Recent security alerts</p>
      {Array.from({ length: 3 }, (_) => crypto.randomUUID()).map((id) => (
        <AlertComp key={id} weight="low" />
      ))}

      <p className="text-xl font-bold mt-2">User Role distribution</p>
      <div className="w-full gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 4 }, (_) => crypto.randomUUID()).map((id) => (
          <RoleDistribution key={id} />
        ))}
      </div>
    </div>
  );
};

const AlertComp: FC<{ weight: "low" | "medium" | "high" }> = ({ weight }) => {
  return (
    <div className="w-full rounded-xl flex gap-3 p-3 dark:bg-card bg-background">
      {weight === "low" && <CheckCircle className="text-primary" />}
      {weight === "medium" && <TriangleAlert className="text-chart-4" />}
      {weight === "high" && <TriangleAlert className="text-destructive" />}
      <div className="w-full">
        <p className="flex justify-between font-bold">
          <span>Multiple failed login attempts</span>
          <span
            className={cn(
              "capitalize",
              weight === "low" && "text-primary",
              weight === "medium" && "text-chart-4",
              weight === "high" && "text-destructive"
            )}
          >
            {weight}
          </span>
        </p>
        <div className="w-full max-w-11/12">
          <p className="font-light">
            IP: 203.0.113.1 has attempted login 5 times in last hour
          </p>
          <p className="mt-2 text-foreground/30 text-sm">15/01/2025, 12:30</p>
        </div>
      </div>
    </div>
  );
};

const RoleDistribution = () => {
  return (
    <div className="w-full dark:bg-card bg-background p-3 rounded-lg">
      <div className="w-full gap-3 flex justify-between">
        <p>Developer</p>
        <p className="text-2xl text-primary font-bold">85</p>
      </div>
      <progress
        value={40}
        max={100}
        className="w-full h-2 rounded-full accent-primary bg-primary  text-primary"
      />
      <p className="text-sm text-foreground/50">54.4% of the total users</p>
    </div>
  );
};
