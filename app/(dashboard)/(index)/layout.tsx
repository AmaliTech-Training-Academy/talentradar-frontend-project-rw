import { AiInsights } from "@/components/feature-specific/dashboard/ai-insights";
import { RecentActivity } from "@/components/feature-specific/dashboard/recent-activity";
import { WelcomeMessageContainer } from "@/components/feature-specific/dashboard/welcome-message-container";

export default function Layout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <main className="space-y-6">
            <WelcomeMessageContainer />
            {children}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RecentActivity />
                <AiInsights />
            </section>
        </main>
    )
}