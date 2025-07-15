import { AiInsights } from "@/components/feature-specific/dashboard/ai-insights";
import { WelcomeMessageContainer } from "@/components/feature-specific/dashboard/welcome-message-container";

export default function ManagerDashboard() {
    return (
        <main className="space-y-6">
            <WelcomeMessageContainer />
            <section>
                <AiInsights />
            </section>
        </main>
    )
}