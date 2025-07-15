import clsx from "clsx";
import { Activity, Brain, FileText, MessageSquare } from "lucide-react";

const activities = [
    {
        id: 1,
        type: 'feedback',
        title: 'Lisa Thompson provided feedback for Michael Rodriguez',
        timestamp: '13/02/2024, 12:15:00'
    },
    {
        id: 2,
        type: 'self-assessment',
        title: 'Michael Rodriguez submitted a self-assessment',
        timestamp: '13/02/2024, 12:15:00'
    },
    {
        id: 3,
        type: 'ai-score',
        title: 'AI score updated for Jane Doe',
        timestamp: '13/02/2024, 12:15:00'
    }
];

export const RecentActivity = () => {
    return (
        <article className="bg-white rounded-md border-[1px] shadow-xs">
            <div className="p-6 shadow-sm flex items-center gap-2">
                <Activity className="w-5 h-5" />
                <h2 className="text-lg font-medium">Recent Activity</h2>
            </div>
            <div className="p-6 space-y-4">
                {
                    activities.map(activity => (
                        <div
                            key={activity.id}
                            className='flex gap-3'
                        >
                            <div
                                className={clsx(
                                    'p-2 rounded-md space-y-4 h-fit',
                                    {
                                        'text-teal bg-teal/10': activity.type === 'feedback',
                                        'text-primary bg-primary/10': activity.type === 'self-assessment',
                                        'text-violet bg-violet/10': activity.type === 'ai-score'
                                    }
                                )}
                            >
                                {
                                    activity.title === 'Strength Identified' ? <MessageSquare className="w-4 h-4" /> :
                                        activity.title === 'Growth Opportunity' ? <FileText className="w-4 h-4" /> :
                                            <Brain className="w-4 h-4" />
                                }
                            </div>
                            <div className="flex flex-col">
                                <p className="text-sm text-foreground/80">{activity.title}</p>
                                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </article>
    );
}