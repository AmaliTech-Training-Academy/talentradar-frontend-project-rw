import clsx from "clsx";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface StatCardProps {
    statInfo: {
        title: string;
        stat: number | string;
        desc: string;
        color: string;
        icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    }
}

export const StatCard = ({ statInfo }: StatCardProps) => {
    const { title, stat, desc, color, icon: Icon } = statInfo;
    const textColor = `text-${color}`;
    const bgColor = `bg-${color}/10`;

    return (
        <article className="p-4 flex items-center justify-between bg-white dark:bg-primary/5 rounded-md border-[1px] shadow-xs">
            <div className="flex flex-col gap-1">
                <p className="text-xs font-medium">{title}</p>
                <p className="text-3xl font-bold">{stat}</p>
                <div className={clsx(
                    `text-xs flex items-center gap-1 ${textColor}`,
                    {
                        'text-orange': color === 'orange',
                    }
                )}>
                    <Icon className="w-3 h-3" />
                    {desc}
                </div>
            </div>
            <div className={clsx(
                `rounded-md p-2 ${bgColor} ${textColor}`,
                {
                    'text-orange bg-orange/10': color === 'orange',
                }
            )}>
                <Icon />
            </div>
        </article>
    );
}