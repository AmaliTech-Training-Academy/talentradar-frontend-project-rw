"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Play, Users } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

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

export const HeroSection = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const heroSlidesData = [
    {
      id: 1,
      titlePart1: "Productivity",
      titlePart2: "Scorecard",
      titlePart3: "Dashboard",
      description:
        "Track 5 key dimensions of developer performance in real-time",
      imageSrc: "/image6.png",
      imageAlt: "Productivity Scorecard Dashboard View 1",
    },
    {
      id: 2,
      titlePart1: "Enhanced",
      titlePart2: "Talent",
      titlePart3: "Insights",
      description:
        "Unlock deeper understanding of your team's capabilities and growth areas",
      imageSrc: "/image3.png",
      imageAlt: "Enhanced Talent Insights Dashboard View 2",
    },
    {
      id: 3,
      titlePart1: "Streamlined",
      titlePart2: "Feedback",
      titlePart3: "Loops",
      description:
        "Facilitate continuous improvement with integrated 360° feedback",
      imageSrc: "/image4.png",
      imageAlt: "Streamlined Feedback Loops Dashboard View 3",
    },
  ];

  return (
    <section className="relative py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 dark:bg-gradient-to-r from-violet/10 to-violet/50">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {heroSlidesData.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
                <div className="flex flex-col items-start gap-4 sm:gap-6 lg:gap-8 order-2 lg:order-1">
                  <div className="inline-flex items-center gap-2 rounded-full px-3 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm bg-violet/50/20 dark:bg-violet/40/20 font-bold border border-violet/50/30 dark:border-violet/400/30">
                    <StarIcon className="h-3 w-3 sm:h-4 sm:w-4 text-orange/50 font-medium" />
                    <span className="hidden sm:inline">
                      Enterprise-Grade Solution
                    </span>
                    <span className="sm:hidden">Enterprise Solution</span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-green/50 to-primary bg-clip-text text-transparent">
                      {slide.titlePart1}
                    </span>{" "}
                    <span className="bg-gradient-to-r from-primary/50 to-violet/60 bg-clip-text text-transparent">
                      {slide.titlePart2}
                    </span>{" "}
                    <span className="bg-gradient-to-r from-violet/60 to-green/50 bg-clip-text text-transparent">
                      {slide.titlePart3}
                    </span>
                  </h1>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-lg leading-relaxed">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                    <Button className="w-full sm:w-auto bg-gradient-to-r from-violet/50 to-violet/70 dark:from-primary/40 dark:to-violet/50 text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-md hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg hover:shadow-violet/50/25">
                      <Play className="h-4 w-4 sm:h-5 sm:w-5" />
                      Try Live Demo
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full sm:w-auto border border-border text-foreground px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base rounded-md hover:bg-accent transition-colors flex items-center justify-center gap-2 bg-transparent"
                    >
                      <Users className="h-4 w-4 sm:h-5 sm:w-5" />
                      View Architecture
                    </Button>
                  </div>
                </div>
                <div className="relative flex justify-center lg:justify-end mt-4 sm:mt-6 lg:mt-0 order-1 lg:order-2 w-full max-w-md sm:max-w-lg lg:max-w-none mx-auto lg:mx-0">
                  <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
                    <Image
                      src={slide.imageSrc || "/placeholder.svg"}
                      width={400}
                      height={400}
                      alt={slide.imageAlt}
                      className="rounded-lg shadow-xl object-cover rotate-3 h-auto w-full"
                      priority
                    />
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 sm:h-10 sm:w-10" />
        <CarouselNext className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 h-8 w-8 sm:h-10 sm:w-10" />

        <div className="flex justify-center gap-1.5 sm:gap-2 mb-[-15px] sm:mb-[-20px] absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              className={`h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full transition-all duration-200 bg-ring ${
                index + 1 === current ? "dark:bg-white w-1.5 sm:w-2" : "bg-ring"
              }`}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
};



