"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatItem } from "./stat-item";
import { SkillItem } from "./skill-item";
import {
  skillConfig,
  statsConfig,
  type TeamMember,
} from "@/lib/data/team-data";
interface CardTabsProps {
  member: TeamMember;
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
        {Object.entries(member.skills).map(([skillKey, score]) => (
          <SkillItem
            key={skillKey}
            label={skillConfig[skillKey as keyof typeof skillConfig].label}
            score={score}
            color={skillConfig[skillKey as keyof typeof skillConfig].color}
            description={
              skillConfig[skillKey as keyof typeof skillConfig].description
            }
            Icon={skillConfig[skillKey as keyof typeof skillConfig].Icon}
          />
        ))}

        <div className="grid grid-cols-3 gap-4 pt-4 ">
          {statsConfig.map((stat) => (
            <StatItem
              key={stat.key}
              value={member.stats[stat.key as keyof typeof member.stats]}
              label={stat.label}
              color={stat.color}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="analytics" className="py-8">
        <div className="text-center text-gray-500">
          <p>Analytics data coming soon...</p>
        </div>
      </TabsContent>

      <TabsContent value="data-sources" className="py-8">
        <div className="text-center text-gray-500">
          <p>Data sources information coming soon...</p>
        </div>
      </TabsContent>

      <TabsContent value="ai-insights" className="py-8">
        <div className="text-center text-gray-500">
          <p>AI insights coming soon...</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};
