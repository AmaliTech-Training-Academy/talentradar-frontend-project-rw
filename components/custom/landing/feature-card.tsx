import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface FeatureCardProps {
  icon: React.ElementType
  title: string
  description: string
  iconBgColor: string
}

export const FeatureCard = ({ icon: Icon, title, description, iconBgColor }: FeatureCardProps) => {
  return (
    <Card className=" border border-white/10 rounded-lg p-6 bg-ring/5 shadow-lg backdrop-blur-sm">
      <CardHeader className="p-0 pb-4">
        <div className={`flex items-center justify-center h-12 w-12 rounded-lg ${iconBgColor} text-white mb-4`}>
          <Icon className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-ring dark:text-white text-sm">{description}</p>
      </CardContent>
    </Card>
  )
}
