"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain } from "lucide-react";
import { CardTabs } from "@/components/manager-dashboard/ai-scores/card-tabs";
import { teamMembers, type TeamMember } from "@/lib/data/team-data";
// import { ModeToggle } from "@/components/common/mode-toggle";
export const AITeamOverview = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedMembers = showAll ? teamMembers : teamMembers.slice(0, 4);

  const getBadgeStyle = (status: TeamMember["status"]) => {
    const styles = {
      "High Performer": "text-primary bg-primary/5",
      Strong: "text-orange bg-orange/5",
      "Needs Improvement": "text-destructive bg-destructive/5",
    };
    return styles[status];
  };

  return (
    <div className="p-6 min-h-screen bg-background">
      {/* <ModeToggle /> */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            AI Scores - Team Overview
          </h1>
          {!showAll && teamMembers.length > 4 && (
            <Button
              onClick={() => setShowAll(true)}
              variant="outline"
              className="text-violet/60 border-violet/60 hover:bg-violet/50 dark:text-violet/40 dark:border-violet/40 dark:hover:text-violet/95"           >
              View All ({teamMembers.length})
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedMembers.map((member) => (
            <Card
              key={member.id}
              className="bg-card shadow-sm border border-border"
            >
              <CardHeader className="mt-[-25px] rounded-t-lg bg-primary/10 dark:bg-primary/30">
                <div className="flex items-center justify-between my-4">
                  <div className="flex items-center space-x-3">
                    <Brain className="w-12 h-12 p-2 rounded-md text-violet/60 bg-violet/10 dark:text-violet/40 dark:bg-violet/15" />

                    <div>
                      <h3 className="font-semibold text-card-foreground">
                        AI Readiness Analysis
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Advanced ML-powered assessment for {member.name}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-muted-foreground">
                      {member.lastUpdated}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-4">
                    <div>
                      <div className="text-3xl font-bold text-primary">
                        {member.overallScore}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Overall Score
                      </span>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-violet/100 dark:text-violet/80 dark:text-violet-400">
                        {member.percentage}%
                      </div>
                      <small className="text-xs text-muted-foreground">
                        Confidence
                      </small>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant="secondary"
                      className={getBadgeStyle(member.status)}
                    >
                      {member.status}
                    </Badge>
                    <div className="text-xs text-muted-foreground mt-1">
                      Performance Level
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <CardTabs member={member} />
              </CardContent>
            </Card>
          ))}
        </div>

        {showAll && (
          <div className="flex justify-center mt-6">
            <Button
              onClick={() => setShowAll(false)}
              variant="outline"
              className="text-violet-600 border-violet-600 hover:bg-violet-50 dark:text-violet-400 dark:border-violet-400 dark:hover:bg-violet-950"
            >
              Show Less
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
