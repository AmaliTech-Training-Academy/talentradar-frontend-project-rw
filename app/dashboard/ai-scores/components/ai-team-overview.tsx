"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain } from "lucide-react";
import { CardTabs } from "@/app/dashboard/ai-scores/components/card-tabs";
import { fetchAiTeamResults } from "@/lib/api/ai-analysis";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setDevelopersScores } from "@/lib/features/ai-score-slice";
import { UserSummary } from "@/lib/types/ai-analysis";

export const AITeamOverview = () => {
  const [showAll, setShowAll] = useState(false);
  const dispatch = useAppDispatch();
  const { developersScores } = useAppSelector((state) => state.aiScores);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: UserSummary[] = await fetchAiTeamResults();
        if (Array.isArray(data)) {
          dispatch(setDevelopersScores(data));
        }
      } catch (err) {
        console.error("API error:", err);
      }
    };
    fetchData();
    //eslint-disable-next-line
  }, []);

  const displayedMembers = showAll
    ? developersScores
    : developersScores.slice(0, 2);

  const getBadgeStyle = (status: string) => {
    const styles: Record<string, string> = {
      "High Performer": "text-primary bg-primary/5",
      "Medium Performer": "text-orange bg-orange/5",
      Strong: "text-orange bg-orange/5",
      "Needs Improvement": "text-destructive bg-destructive/5",
      "Low Performer": "text-destructive bg-destructive/5",
    };
    return styles[status] || "bg-muted";
  };

  return (
    <div className="p-6 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            AI Scores - Team Overview
          </h1>
          {!showAll && developersScores.length > 2 && (
            <Button
              onClick={() => setShowAll(true)}
              variant="outline"
              className="text-violet/60 border-violet/60 hover:bg-violet/50 dark:text-white dark:border-violet/40 dark:hover:bg-violet/95"
            >
              View All ({developersScores.length})
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedMembers.map((member) => (
            <Card
              key={member.userId}
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
                        Advanced ML-powered assessment for {member.userId}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex gap-4">
                    <div>
                      <div className="text-3xl font-bold text-primary">
                        {member.readinessScore}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Overall Score
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant="secondary"
                      className={getBadgeStyle(member.performanceLevel)}
                    >
                      {member.performanceLevel}
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
              className="text-violet/60 border-violet/60 hover:bg-violet/50 dark:text-white dark:border-violet/40 dark:hover:bg-violet/95"
            >
              Show Less
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
