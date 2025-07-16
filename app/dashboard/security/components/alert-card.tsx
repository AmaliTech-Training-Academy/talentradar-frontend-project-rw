import { FC } from "react";
import { CheckCircle, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

export const AlertCard: FC<{ weight: "low" | "medium" | "high" }> = ({ weight }) => {
  return (
    <div className="w-full rounded-xl flex items-start gap-3 p-3 dark:bg-card bg-background">
      {weight === "low" && (
        <CheckCircle
          size={18}
          strokeWidth={1.9}
          className="text-primary mt-1"
        />
      )}
      {weight === "medium" && (
        <TriangleAlert
          size={18}
          strokeWidth={1.9}
          className="text-chart-4 mt-1"
        />
      )}
      {weight === "high" && (
        <TriangleAlert
          size={18}
          strokeWidth={1.9}
          className="text-destructive mt-1"
        />
      )}
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
