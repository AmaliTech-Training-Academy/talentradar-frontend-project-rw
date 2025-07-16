import { GTRSCard } from "./gtrs-card"
import {
  Brain,
  Code,
  MessageSquare,
  Zap,
} from "lucide-react";
export const Microservices = () => {
    return(
         <section className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 text-center bg-ring/5 dark:bg-gradient-to-r from-violet/30 to-violet/40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 lg:mb-8">
                GTRS Microservices Architecture
              </h2>
              <p className="text-base sm:text-lm md:text-lg lg:text-xl dark:text-white/60  max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-12 xl:mb-16 leading-relaxed">
                Enterprise-grade microservices powering the Global Talent
                Readiness System
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 max-w-6xl mx-auto">
              <div className="w-full">
                <GTRSCard
                  icon={Code}
                  title="SelfAssessment Service"
                  description="Comprehensive developer self-evaluation with 5-point Likert scale across 5 dimensions"
                  iconBgColor="bg-primary/80 dark:bg-primary"
                  status="Service Active"
                />
              </div>
              <div className="w-full">
                <GTRSCard
                  icon={MessageSquare}
                  title="ManagerFeedback Service"
                  description="Structured feedback forms with professional evaluation criteria and versioning"
                  iconBgColor="bg-green/80 dark:bg-green"
                  status="Service Active"
                />
              </div>
              <div className="w-full">
                <GTRSCard
                  icon={Brain}
                  title="AIAnalysis Service"
                  description="Machine learning-powered readiness scoring with confidence levels and trend analysis"
                  iconBgColor="bg-violet/70 dark:bg-violet"
                  status="Service Active"
                />
              </div>
              <div className="w-full">
                <GTRSCard
                  icon={Zap}
                  title="Notification Service"
                  description="Event-driven alerts and notifications with real-time in updates via  Kafka/SQS"
                  iconBgColor="bg-orange/90 dark:bg-orange"
                  status="Service Active"
                />
              </div>
            </div>
          </div>
        </section>
    )
}