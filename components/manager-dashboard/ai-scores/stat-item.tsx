interface StatItemProps {
  value: number
  label: string
  color: string
  suffix?: string
}

export const StatItem = ({ value, label, color, suffix = "" }: StatItemProps) => {
  return (
    <div className="text-center">
      <div className={`text-lg font-bold ${color}`}>
        {value}
        {suffix}
      </div>
      <div className="text-xs text-gray-500">{label}</div>
    </div>
  )
}
