"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain } from "lucide-react"
import { CardTabs } from "@/components/manager-dashboard/ai-scores/card-tabs"
import { teamMembers, type TeamMember } from "@/lib/data/team-data"

export const AITeamOverview = () => {
  const [showAll, setShowAll] = useState(false)
  const displayedMembers = showAll ? teamMembers : teamMembers.slice(0, 4)

  const getBadgeStyle = (status: TeamMember["status"]) => {
    const styles = {
      "High Performer": "text-primary bg-primary/5",
      "Strong": "text-orange bg-orange/5",
      "Needs Improvement": "text-destructive bg-destructive/5",
    }
    return styles[status]
  }

  return (
    <div className="p-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">AI Scores - Team Overview</h1>
          {!showAll && teamMembers.length > 4 && (
            <Button
              onClick={() => setShowAll(true)}
              variant="outline"
              className="text-blue-600 border-blue-600 hover:bg-blue-50"
            >
              View All ({teamMembers.length})
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedMembers.map((member) => (
            <Card key={member.id} className="bg-white shadow-sm border border-gray-200">
              <CardHeader className=" mt-[-25px] rounded-lg bg-primary/10">
                <div className="flex items-center justify-between my-4">
                  <div className="flex items-center space-x-3">
                      <Brain className="w-12 h-12 p-2 rounded-md  text-violet bg-violet/20" />
                    
                    <div>
                      <h3 className="font-semibold">AI Readiness Analysis</h3>
                      <p className="text-sm text-gray-500">Advanced ML-powered assessment for {member.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400">{member.lastUpdated}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-4">
                    <div>
                      <div className="text-3xl font-bold text-primary">{member.overallScore}</div>
                      <span className="text-sm">Overall Score</span>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-violet">{member.percentage}%</div>
                    <small className="text-xs">Confidence</small>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className={getBadgeStyle(member.status)}>
                      {member.status}
                    </Badge>
                    <div className="text-xs text-gray-500 mt-1">Performance Level</div>
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
            <Button onClick={() => setShowAll(false)} variant="outline">
              Show Less
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
