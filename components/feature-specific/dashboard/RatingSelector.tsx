"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export type RatingOption = {
  value: number
  color: string
  title: string
  desc: string
}

interface RatingSelectorProps {
  options: RatingOption[]
  selected: number
  onSelect: (value: number) => void
}

export default function RatingSelector({
  options,
  selected,
  onSelect,
}: RatingSelectorProps) {
  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4">
      {options.map((option) => (
        <Card
          key={option.value}
          onClick={() => onSelect(option.value)}
          className={cn(
            "cursor-pointer  border flex flex-col items-center justify-center text-center",
            selected === option.value ? "ring-2 ring-blue-500 border-blue-500" : "border-gray-300"
          )}
        >
          <div
            className={cn(
              "w-10 h-10 rounded-full mb-2",
              option.color === "red" && "bg-destructive",
              option.color === "orange" && "bg-orange",
              option.color === "yellow" && "bg-chart-4",
              option.color === "blue" && "bg-primary",
              option.color === "green" && "bg-teal"
            )}
          ></div>
          <div className="text-xl font-bold">{option.value}</div>
          <div className="font-semibold">{option.title}</div>
          <div className="text-xs text-muted-foreground">{option.desc}</div>
        </Card>
      ))}
    </div>
  )
}
