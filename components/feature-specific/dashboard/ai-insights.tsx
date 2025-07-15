import clsx from "clsx";
import { Award, Calendar, Target } from "lucide-react";

const insights = [
    {
        id: 1,
        icon: Award,
        title: 'Strength Identified',
        desc: 'Your technical leadership skills have improved significantly. Consider mentoring junior developers.'
    },
    {
        id: 2,
        icon: Target,
        title: 'Growth Opportunity',
        desc: 'Increase cross-team collaboration to enhance your communication impact score.'
    },
    {
        id: 3,
        icon: Calendar,
        title: 'Upcoming',
        desc: 'Your next self-assessment is due in 5 days. Prepare by reviewing recent projects.'
    }
];

export const AiInsights = () => {
    return (
        <article className="bg-white dark:bg-primary/5 rounded-md border-[1px] shadow-xs">
            <div className="p-6 shadow-sm dark:border-b-[1px]">
                <h2 className="text-lg font-medium">AI Insights & Recommendations</h2>
            </div>
            <div className="p-6 space-y-3">
                {
                    insights.map(insight => {
                        const { id, title, icon: Icon, desc } = insight
                        return (
                        <div
                            key={id}
                            className={clsx(
                                'p-4 rounded-md space-y-3',
                                {
                                    'text-teal bg-teal/10': title === 'Strength Identified',
                                    'text-primary bg-primary/10': title === 'Growth Opportunity',
                                    'text-violet bg-violet/10': title === 'Upcoming'
                                }
                            )}
                        >
                            <div className="flex space-x-2 items-center">
                                <Icon className="w-4 h-4" />
                                <h3 className="font-bold text-sm">{title}</h3>
                            </div>
                            <p className="text-sm">{desc}</p>
                        </div>
                    )})
                }
            </div>
        </article>
    )
}