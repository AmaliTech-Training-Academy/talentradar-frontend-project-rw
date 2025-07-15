import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface StatCardProps {
    statInfo: {
        title: string;
        stat: number;
        desc: string;
        color: string;
        icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    }
}

export const StatCard = ({ statInfo }: StatCardProps) => {
    const { title, stat, desc, color, icon: Icon } = statInfo;

    return (
        <article className="p-4 flex items-center justify-between bg-white dark:bg-primary/5 rounded-md border-[1px] shadow-xs">
            <div className="flex flex-col gap-1">
                <p className="text-xs font-medium">{title}</p>
                <p className="text-3xl font-bold">{stat}</p>
                <div className="text-xs flex items-center gap-1" style={{ color: `var(--${color})` }}>
                    <Icon className="w-3 h-3" style={{ color: `var(--${color})` }} />
                    {desc}
                </div>
            </div>
            <div className="rounded-md p-2" style={{ backgroundColor: `color-mix(in oklch, var(--${color}) 10%, var(--surface))`}}>
                <Icon style={{ color: `var(--${color})` }} />
            </div>
        </article>
    );
}