import type React from "react"
import { Users, CheckCircle, Brain, ShieldCheck } from "lucide-react"

interface StatProps {
  icon: React.ElementType
  value: string
  label: string
  iconBgColor: string
}

function StatItem({ icon: Icon, value, label, iconBgColor }: StatProps) {
  return (
    <div className="flex flex-col items-center text-center gap-2">
      <div className={`flex items-center justify-center h-16 w-16 p-5 rounded-full ${iconBgColor} text-white`}>
        <Icon className="h-10 w-10" />
      </div>
      <div className="text-3xl font-bold">{value}</div>
      <p className="text-gray-300 text-sm">{label}</p>
    </div>
  )
}

export const StatsSection = () => {
  return (
    <section className="py-8 md:py-20 lg:py-14 bg-ring/5 dark:bg-gradient-to-r from-violet/30 to-violet/40">
      <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 px-4 md:px-8 lg:px-12">
        <StatItem icon={Users} value="10K+" label="Active Developers" iconBgColor=" bg-gradient-to-r from-primary to-violet/60" />
        <StatItem icon={CheckCircle} value="50K+" label="Assessments Completed" iconBgColor="bg-gradient-to-r from-primary to-violet/60" />
        <StatItem icon={Brain} value="94.2%" label="AI Accuracy" iconBgColor="bg-gradient-to-r from-primary to-violet/60"/>
        <StatItem icon={ShieldCheck} value="99.9%" label="Uptime" iconBgColor="bg-gradient-to-r from-primary to-violet/60"/>
      </div>
    </section>
  )
}
