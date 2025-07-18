"use client"
import { Card } from "@/components/ui/card"
import { RatingOption } from "@/lib/types"
import { cn } from "@/lib/utils"

interface RatingSelectorProps {
  options: RatingOption[]
  selected: number
  onSelectAction: (value: number) => void
}

export default function RatingSelector({
  options,
  selected,
  onSelectAction,
}: RatingSelectorProps) {
  return (
    <div>
        <div className="flex justify-between items-center mb-1">
            <p className="font-semibold text-muted-foreground">Rating Scale</p>
            <p className="text-muted-foreground text-sm">Select your current level</p>
        </div>
    <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4">
      {options.map((option) => (
        <Card
          key={option.value}
          onClick={() => onSelectAction(option.value)}
          className={cn(
            "cursor-pointer border px-2 flex flex-col items-center justify-center text-center rounded-lg py-2 space-y-2",
            selected === option.value 
              ? cn(
                  "ring-2",
                  option.color === "red" && "ring-destructive border-destructive bg-destructive/10",
                  option.color === "orange" && "ring-orange border-orange bg-orange/10",
                  option.color === "yellow" && "ring-chart-4 border-chart-4 bg-chart-4/10",
                  option.color === "blue" && "ring-primary border-primary bg-primary/10",
                  option.color === "green" && "ring-teal border-teal bg-teal/10"
                )
              : "border-gray-300"
          )}
        >
          <div className="flex flex-col items-center justify-center mb-2">
          <div
            className={cn(
              "w-7 h-7 rounded-full mb-1 ",
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

          </div>
        </Card>
      ))}
    </div>

    </div>
  )
}
