import { ActivityPayload } from "@/lib/types/activities";
import clsx from "clsx";
import { Activity, } from "lucide-react";
import LogIcon from "./log-icon";

export const RecentActivity = ({activities}:{activities: ActivityPayload[]}) => {
    return (
        <article className="bg-white dark:bg-primary/5 rounded-md border-[1px] shadow-xs">
            <div className="p-6 shadow-sm dark:border-b-[1px] flex items-center gap-2">
                <Activity className="w-5 h-5" />
                <h2 className="text-lg font-medium">Recent Activity</h2>
            </div>
            <div className="p-6 space-y-4">
                {
                    activities.map(activity => {
                        const { id, type, title, timestamp} = activity
                        return (
                        <div
                            key={id}
                            className='flex gap-3'
                        >
                            <div
                                className={clsx(
                                    'p-2 rounded-md space-y-4 h-fit',
                                    {
                                        'text-teal bg-teal/10': type === 'feedback',
                                        'text-primary bg-primary/10': type === 'self-assessment',
                                        'text-violet bg-violet/10': type === 'ai-score'
                                    }
                                )}
                            >
                                <LogIcon type={type} />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-sm text-foreground/80">{title}</p>
                                <p className="text-xs text-muted-foreground">{timestamp}</p>
                            </div>
                        </div>
                    )})
                }
            </div>
        </article>
    );
}