import { FeatureCard } from "@/components/custom/landing/feature-card";
import { Brain, BarChart, Users, Rocket, Shield, Globe } from "lucide-react";

export const FeatureSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 text-center dark:bg-gradient-to-r from-violet/10 to-violet/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Powerful Features for Modern Teams
          </h2>
          <p className="text-base sm:text-md md:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12 xl:mb-16 leading-relaxed">
            Everything you need to assess, develop, and track talent readiness
            with AI-powered insights
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 max-w-7xl mx-auto">
          <div className="w-full">
            <FeatureCard
              icon={Brain}
              title="AI-Powered Insights"
              description="Advanced machine learning algorithms analyze GitHub, Slack, and Jira data to provide comprehensive readiness assessments"
              iconBgColor="  bg-gradient-to-r from-violet/70 to-destructive/70 dark:bg-gradient-to-r from-violet/30 to-destructive/60"
            />
          </div>
          <div className="w-full">
            <FeatureCard
              icon={BarChart}
              title="Productivity Scorecard"
              description="Track workload balance, code quality, flow efficiency, cross-functionality, and business value in real-time"
              iconBgColor="bg-teal/60 dark: bg-gradient-to-r from-primary/60 to-teal/80"
            />
          </div>
          <div className="w-full md:col-span-2 lg:col-span-1">
            <FeatureCard
              icon={Users}
              title="360° Feedback System"
              description="Seamless collaboration between developers and managers with structured feedback loops"
              iconBgColor="bg-gradient-to-r from-green/40 to-green/60 "
            />
          </div>
          <div className="w-full">
            <FeatureCard
              icon={Rocket}
              title="AI-Guided Roadmaps"
              description="Personalized development paths with mock tests and resource recommendations"
              iconBgColor="bg-orange/80 dark:bg-gradient-to-r from-orange/60 to-orange "
            />
          </div>
          <div className="w-full">
            <FeatureCard
              icon={Shield}
              title="Enterprise Security"
              description="Role-based access control with comprehensive authentication and authorization matrix"
              iconBgColor="bg-violet/80 dark:bg-violet"
            />
          </div>
          <div className="w-full md:col-span-2 lg:col-span-1">
            <FeatureCard
              icon={Globe}
              title="Microservices Architecture"
              description="Scalable, event-driven, with feedback, AI analysis, and notification services"
              iconBgColor="bg-destructive/80 dark:bg-destructive"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
