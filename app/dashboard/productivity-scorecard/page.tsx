import React from "react";
import { WelcomeCard } from "./components/welcome-card";
import { InfoCard } from "./components/info-card";
import { infocardData } from "@/lib/data/productivity-data";
import { AiInsights } from "../components/ai-insights";
import { RecentActivity } from "../components/recent-activity";
import { activities } from "@/lib/data/welcome";
import { RecommendedAction } from "./components/recommended-action";
const Page = () => {
  return (
    <section className="w-full">
      <WelcomeCard />
      <section className="grid md:grid-cols-3 grid-cols-1 gap-5 mt-5">
        {Array.from({ length: 5 }, (val, i) => ({
          id: crypto.randomUUID(),
          ...infocardData[i],
        })).map((data) => (
          <InfoCard data={data} key={data.id} />
        ))}
      </section>
      <section className="grid mt-5 grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity activities={activities} title="Recent Activity" />
        <AiInsights />
      </section>
      <section className="mt-5">
        <RecommendedAction />
      </section>
    </section>
  );
};

export default Page;
