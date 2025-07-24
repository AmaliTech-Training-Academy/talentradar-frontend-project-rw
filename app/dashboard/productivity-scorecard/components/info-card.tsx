import { TrendingDown, TrendingUp } from "lucide-react";
import { InfoCardDataProps } from "@/lib/data/productivity-data";
import { cn } from "@/lib/utils";
export const InfoCard = ({ data }: { data: InfoCardDataProps }) => {
  const { title, colors, description, trendingVal, Icon } = data;
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors[1]}, ${colors[0]})`,
  };
  const progress = `${(trendingVal / 5) * 100}%`;
  const singleColor = `text-${colors[1]}`;
  return (
    <section
      className={cn("w-full rounded-[16px] shadow-sm  pt-3 ")}
      style={gradientStyle}
    >
      <div className="w-full h-full bg-sidebar p-6 rounded-b-xl space-y-3">
        <article className="w-full flex justify-between">
          <div
            className={cn("p-3 rounded-lg text-white")}
            style={gradientStyle}
          >
            <Icon />
          </div>
          <div className="flex flex-row gap-2 items-center ">
            {trendingVal < 2.5 && <TrendingDown className="text-destructive" />}
            {trendingVal >= 2.5 && <TrendingUp className="text-green" />}
            <p className={cn("font-bold text-xl", singleColor)}>
              {trendingVal}
            </p>
          </div>
        </article>
        <p className="text-xl font-bold">{title}</p>
        <p className="text-sm ">{description}</p>
        <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
          <div
            className={cn("h-full rounded-full")}
            style={{ width: progress, ...gradientStyle }}
          />
        </div>
      </div>
    </section>
  );
};
