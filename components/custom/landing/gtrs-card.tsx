import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Circle } from "lucide-react"

interface GTRSCardProps {
  icon: React.ElementType
  title: string
  description: string
  iconBgColor: string
  status: string
}

export const GTRSCard = ({ icon: Icon, title, description, iconBgColor, status }: GTRSCardProps) => {
  return (
    <Card className="bg-ring/5 border border-white/10 rounded-lg p-6 shadow-lg">
      <CardHeader className="p-0 pb-4">
        <div className={`flex items-center justify-center h-12 w-12 rounded-lg ${iconBgColor} text-white `}>
          <Icon className="h-6 w-6" />
        </div>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <p className="text-gray-300 text-sm mb-4">{description}</p>
        <div className="flex items-center text-sm text-gray-400">
          <Circle className="h-3 w-3 bg-green text-green rounded-full mr-1 fill-green/5" />
          {status}
        </div>
      </CardContent>
    </Card>
  )
}
