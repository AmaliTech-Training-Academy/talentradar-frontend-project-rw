import { Progress } from "@/components/ui/progress";

interface SkillItemProps {
  label: string;
  score: number;
  color: string;
  description?: string;
}

export const SkillItem = ({
  label,
  score,
  color,
  description,
}: SkillItemProps) => {
  const percentage = (score / 5) * 100;
  const colorMap: { [key: string]: string } = {
    first: "primary",
    second: "var(--green)",
    third: "var(--violet)",
    fourth: "var(--orange)",
    fify: "var(--teal)",
  };
  const backgroundColor = colorMap[color] || "ring";

  return (
    <div className="space-y-2 p-2 bg-ring/10 rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-sm font-medium ">{label}</span>
        </div>
        <span className="text-sm font-semibold">{score}</span>
      </div>
      <div className="relative w-full">
        <Progress
          value={percentage}
          className="h-2 w-full"
        />
        <div
          className="absolute top-0 left-0 h-2 rounded-full transition-all duration-300"
          style={{
            width: `${percentage}%`,
            backgroundColor: backgroundColor,
          }}
        />
        <div
          className="absolute top-0 h-2 rounded-full transition-all duration-300"
          style={{
            left: `${percentage}%`,
            width: `${100 - percentage}%`,
            backgroundColor: `${backgroundColor}0`,
          }}
        />
      </div>
      <div>
        {description && <span className="text-xs mt-1">{description}</span>}
      </div>
    </div>
  );
}
