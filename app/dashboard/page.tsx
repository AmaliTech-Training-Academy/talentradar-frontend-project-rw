import { AiInsights } from "@/app/dashboard/components/ai-insights";
import { RecentActivity } from "@/app/dashboard/components/recent-activity";
import { StatCard } from "@/app/dashboard/components/stat-card";
import { WelcomeMessageContainer } from "@/app/dashboard/components/welcome-message-container";
import { activities } from "@/lib/data/welcome";
import { CircleAlert, CircleCheckBig, ChartColumn, Users } from "lucide-react";

const stats = [
    {
        id: 1,
        title: 'Team Member',
        stat: 3,
        desc: 'Direct reports',
        color: 'primary',
        icon: Users,
    },
    {
        id: 2,
        title: 'Feedback Provided',
        stat: 2,
        desc: 'This quarter',
        color: 'teal',
        icon: CircleCheckBig,
    },
    {
        id: 3,
        title: 'Pending Reviews',
        stat: 1,
        desc: 'Require attention',
        color: 'orange',
        icon: CircleAlert,
    },
    {
        id: 4,
        title: 'Team Average',
        stat: '4.1/5',
        desc: 'Team performance',
        color: 'teal',
        icon: ChartColumn,
    }
];

export default function Dashboard() {
    return (
      <main className="space-y-6">
        <WelcomeMessageContainer />
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.id} statInfo={stat} />
          ))}
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity activities={activities} title="Recent Activity" />
          <AiInsights />
        </section>
      </main>
    );
}