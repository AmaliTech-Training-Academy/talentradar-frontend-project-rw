"use client";

import { welcomeData, filters } from "@/lib/data/welcome";
import { Clock4 } from "lucide-react";
import { AppSelect } from "@/components/custom/app-select";
import { useState } from "react";
import { useAppSelector } from "@/lib/hooks";

export const WelcomeMessageContainer = () => {
  const { last_updated } = welcomeData;
  // const { fullName, last_updated } = welcomeData;
  const [filter, setFilter] = useState("");
  const user = useAppSelector((state) => state.auth);
  return (
    <section className="p-6 bg-gradient-to-r from-primary/5 to-background rounded-md border-input border-[1px] shadow-xs flex flex-col lg:flex-row gap-6 justify-between">
      <article className="space-y-4">
        <h1 className="font-bold text-2xl sm:text-3xl">
          Welcome back, {user.userName}! 👋
        </h1>
        <p className="text-foreground/70">
          Here&apos;s your comprehensive talent readiness overview
        </p>
      </article>
      <article className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
        <span className="flex items-center gap-1 text-xs text-muted-foreground">
          <Clock4 className="w-4 h-4" /> Last updated: {last_updated}
        </span>
        <AppSelect
          options={filters}
          placeholder="Filter by Date range"
          value={filter}
          onChangeAction={(value) => setFilter(value)}
        />
      </article>
    </section>
  );
};
