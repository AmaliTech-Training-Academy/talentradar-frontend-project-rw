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
        <article className="p-4 flex items-center justify-between bg-white rounded-md border-[1px] shadow-xs">
            <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold">{title}</p>
                <p className="text-2xl font-bold">{stat}</p>
                <p className="text-sm" style={{ color: `var(--${color})` }}>{desc}</p>
            </div>
            <div className="rounded-md p-2" style={{ backgroundColor: `color-mix(in oklch, var(--${color}) 10%, white)`}}>
                <Icon style={{ color: `var(--${color})` }} />
            </div>
        </article>
    );
}