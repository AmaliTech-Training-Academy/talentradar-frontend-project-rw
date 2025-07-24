"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SkillItem } from "./skill-item";
import { MemberFeedback } from "./member-feedback";
import { configColors, skillConfig } from "@/lib/types/ai-analysis";
import type { UserSummary } from "@/lib/types/ai-analysis";
// import { Brain } from "lucide-react";

interface CardTabsProps {
  member: UserSummary;
}

export const CardTabs = ({ member }: CardTabsProps) => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4 mb-4 bg-white dark:bg-background p-0 h-auto">
        <TabsTrigger
          value="overview"
          className="data-[state=active]:text-violet  "
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="analytics"
          className=" data-[state=active]:text-violet"
        >
          Analytics
        </TabsTrigger>
        <TabsTrigger
          value="data-sources"
          className="data-[state=active]:text-violet "
        >
          Data Sources
        </TabsTrigger>
        <TabsTrigger
          value="ai-insights"
          className="data-[state=active]:text-violet "
        >
          AI Insights
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        {member.averageScores &&
          Object.entries(member.averageScores).map(([skillKey, score], i) => (
            <SkillItem
              key={skillKey}
              label={
                skillConfig[skillKey as keyof typeof skillConfig]?.label ||
                skillKey
              }
              score={Number(score)}
              color={
                skillConfig[skillKey as keyof typeof skillConfig]?.color ||
                configColors[i].color
              }
              Icon={
                skillConfig[skillKey as keyof typeof skillConfig]?.Icon ||
                configColors[i].icon
              }
            />
          ))}

        {member.overallFeedback && (
          <MemberFeedback feedback={member.overallFeedback} />
        )}
      </TabsContent>

      <TabsContent value="analytics" className="py-8">
        <div className="text-center text-ring">
          <p>Analytics data coming soon...</p>
        </div>
      </TabsContent>

      <TabsContent value="data-sources" className="py-8">
        <div className="text-center text-ring">
          <p>Data sources information coming soon...</p>
        </div>
      </TabsContent>

      <TabsContent value="ai-insights" className="py-8">
        <div className="text-center text-ring">
          <p>AI insights coming soon...</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};
