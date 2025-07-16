import type React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Play, Users } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="relative py-12 md:py-24 lg:py-8 xl:py-18 dark:bg-gradient-to-r from-violet/10 to-violet/50">
      <div className="container mx-auto grid lg:grid-cols-2 gap-8 items-center px-4 md:px-8 ">
        <div className="flex flex-col items-start gap-6">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1 text-sm bg-violet-500/20 dark:bg-violet-400/20 font-bold border border-violet-500/30 dark:border-violet-400/30">
            <StarIcon className="h-4 w-4 text-orange/50 font-medium" />
            Enterprise-Grade Solution
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-green/50 to-primary bg-clip-text text-transparent">
              Productivity
            </span>{" "}
            <span className="bg-gradient-to-r from-primary/50 to-violet/60 bg-clip-text text-transparent">
              Scorecard
            </span>{" "}
            <span className="bg-gradient-to-r from-violet/60 to-green/50 bg-clip-text text-transparent">
              Dashboard
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
            Track 5 key dimensions of developer performance in real-time
          </p>
          <div className="flex flex-col sm:flex-row gap-4 ">
            <Button className="bg-gradient-to-r from-violet/50 to-violet/70 dark:from-primary/40 dark:to-violet/50 text-white px-8 py-3 rounded-md hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg hover:shadow-violet/50/25">
              <Play className="h-5 w-5" />
              Try Live Demo
            </Button>
            <Button
              variant="outline"
              className="border border-border text-foreground px-8 py-3 rounded-md hover:bg-accent transition-colors flex items-center gap-2 bg-transparent"
            >
              <Users className="h-5 w-5" />
              View Architecture
            </Button>
          </div>
        </div>
        <div className="relative flex justify-center lg:justify-end mt-8 lg:mt-0">
          <Image
            src="/dashboard.png"
            width={400}
            height={400}
            alt="Productivity Scorecard Dashboard"
            className="rounded-lg shadow-2xl object-cover rotate-3"
          />
        </div>
      </div>
    </section>
  );
};

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}
