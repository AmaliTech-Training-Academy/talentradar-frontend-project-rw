import { welcomeData, filters } from "@/lib/data/welcome";
import { Clock4 } from "lucide-react";
import { AppSelect } from "@/components/common/app-selector";

export const WelcomeMessageContainer = () => {
    const { fullName, last_updated } = welcomeData;

    return (
        <section
            className="p-6 bg-gradient-to-r from-primary/5 to-background rounded-md border-input border-[1px] shadow-xs flex flex-col lg:flex-row gap-6 justify-between"
        >
            <article className="space-y-4">
                <p className="font-bold text-2xl sm:text-3xl">Welcome back, {fullName}! 👋</p>
                <p className="text-foreground/70">Here's your comprehensive talent readiness overview</p>
            </article>
            <article className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock4 className="w-4 h-4" /> Last updated: {last_updated}
                </span>
                <AppSelect items={filters} />
            </article>
        </section>
    );
}