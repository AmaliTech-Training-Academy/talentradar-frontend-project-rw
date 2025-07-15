import { welcomeData, filters } from "@/lib/data/welcome";
import { Clock4 } from "lucide-react";
import { AppSelect } from "./app-selector";

export const WelcomeMessageContainer = () => {
    const { fullName, last_updated } = welcomeData;

    return (
        <section className="p-6 bg-gradient-to-r from-primary/10 to-white/10 rounded-md">
            <article>
                <p>Welcome back, {fullName}! 👋</p>
                <p>Here's your comprehensive talent readiness overview</p>
            </article>
            <article>
                <span>
                    <Clock4 /> Last updated: {last_updated}
                </span>
                <AppSelect items={filters} />
            </article>
        </section>
    );
}