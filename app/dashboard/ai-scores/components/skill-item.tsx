"use client";
import { Progress } from "@/components/ui/progress";
import { camelCaseToWords } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface SkillItemProps {
  label: string;
  score: number;
  color: string;
  Icon: LucideIcon;
}

export function SkillItem({ label, score, color, Icon }: SkillItemProps) {
  const safeColor = color || "bg-ring";
  const textColorClass = safeColor.replace("bg-", "text-");

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon className="w-4 h-4 text-ring" />
          <span className="text-sm font-medium ">
            {camelCaseToWords(label)}
          </span>
        </div>

        <span className={`text-sm font-semibold ${textColorClass}`}>
          {score}
        </span>
      </div>
      <div className="relative">
        <Progress value={(score / 5) * 100} className="h-2" />
        <div
          className={`absolute top-0 left-0 h-2 rounded-full ${safeColor}`}
          style={{
            width: `${(score / 5) * 100}%`,
            color: `var(--${safeColor})`,
          }}
        />
      </div>
      {/* <p className="text-xs text-gray-500">{description}</p> */}
    </div>
  );
}
