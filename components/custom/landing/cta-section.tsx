import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

export const CtaSection = () => {
  return (
    <section className="py-3 sm:py-4 md:py-5 lg:py-6 xl:py-8   dark:bg-gradient-to-r from-violet/10 to-violet/50 text-center">
      <div className="container  mx-auto px-2 sm:px-2 lg:px-2 xl:px-3">
        <div className="max-w-2xl mx-auto rounded-xl bg-ring/10 dark:bg-gradient-to-r from-chart-1 to-violet/50  lg:rounded-2xl p-8 sm:p-10 md:p-12 lg:px-16 xl:px-20 shadow-2xl shadow-violet-500/20">
          <h2 className="text-md sm:text-lg md:text-lg lg:text-xl xl:text-2xl font-bold mb-1 sm:mb-3">
            Ready to Transform Your Team?
          </h2>
          <p className="text-base sm:text-xs md:text-sm lg:text-md max-w-2xl mx-auto mb-4 sm:mb-5 lg:mb-6 leading-relaxed">
            Experience the future of talent assessment with our comprehensive
            GTRS platform
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 lg:gap-8">
            <Button className="w-full text-white sm:w-auto bg-gradient-to-r from-primary  to-violet/70  px-6 sm:px-8 lg:px-10 py-3 lg:py-4 rounded-lg lg:rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 font-semibold text-sm sm:text-base lg:text-sm">
              Start Free Trial <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              variant="outline"
              className="w-full bg-violet dark:from-violet/60 dark:to-violet/80 hover:opacity-90 hover:shadow-violet/50/25  sm:w-auto border-2 border-white/30 text-white px-6 sm:px-8 lg:px-10 py-3 lg:py-4 rounded-lg lg:rounded-xl hover:bg-white/90 transition-all duration-200 flex items-center justify-center gap-2  font-semibold text-sm sm:text-base lg:text-sm"
            >
              <Play className="h-4 w-4 sm:h-5 sm:w-5" />
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
