"use client";

import { filters } from "@/lib/data/welcome";
import { Calendar, TrendingUp } from "lucide-react";
import { AppSelect } from "@/components/custom/app-select";
import { useState } from "react";
import { OverallScoreCard } from "./overall-score-card";

export const WelcomeCard = () => {
  const [filter, setFilter] = useState("");

  return (
    <section className="p-6 bg-gradient-to-r from-primary/10 to-violet/10 rounded-md border-input border-[1px] shadow-xs space-y-4">
      <article className=" flex flex-col lg:flex-row gap-6 md:items-center items-end justify-between">
        <div className="space-y-1">
          <h1 className="font-bold text-2xl sm:text-3xl">
            Developer Productivity Scorecard
          </h1>
          <p className="text-foreground/70">
            Here&apos;s your comprehensive talent readiness overview
          </p>
        </div>

        <AppSelect
          options={filters}
          placeholder="Filter by Date range"
          value={filter}
          onChangeAction={(value) => setFilter(value)}
        />
      </article>
      <article className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
        <OverallScoreCard />
        <section className="bg-card  rounded-xl space-y-2 md:space-y-4 p-4">
          <article className="w-full justify-between flex items-center px-4 ">
            <p className="text-lg font-bold">This week</p>
            <Calendar size={30} className="text-primary" />
          </article>
          <article className="w-full justify-between flex items-center px-4 ">
            <p className="">This week</p>
            <p className="font-bold">12/5</p>
          </article>
          <article className="w-full justify-between flex items-center px-4 ">
            <p className="">Code reviews</p>
            <p className="font-bold">28</p>
          </article>
          <article className="w-full justify-between flex items-center px-4 ">
            <p className="">Commits</p>
            <p className="font-bold">23</p>
          </article>
        </section>
        <section className="bg-card  rounded-xl space-y-2 md:space-y-4 p-4">
          <article className="w-full justify-between flex items-center px-4 ">
            <p className="text-lg font-bold">Trends</p>
            <TrendingUp size={30} className="text-violet" />
          </article>
          <article className="w-full justify-between flex items-center px-4 ">
            <p className="">Improving</p>
            <p className="font-bold text-green">3 areas</p>
          </article>
          <article className="w-full justify-between flex items-center px-4 ">
            <p className="">Declining</p>
            <p className="font-bold text-destructive">2 areas</p>
          </article>
          <article className="w-full justify-between flex items-center px-4 ">
            <p className="">Commits</p>
            <p className="font-bold text-muted-foreground">0 area</p>
          </article>
        </section>
      </article>
    </section>
  );
};
