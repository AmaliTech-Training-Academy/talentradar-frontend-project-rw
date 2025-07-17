import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-4 sm:py-5 md:py-6 lg:py-8 xl:py-10 bg-ring/5 border-t border-white/10 dark:bg-gradient-to-r from-violet/25 to-violet/15">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 xl:gap-12 px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex flex-col gap-3 sm:gap-4 sm:col-span-2 md:col-span-1">
          <div className="flex items-center gap-2">
            <div className="font-bold text-lg sm:text-xl">
              <span className="bg-violet dark:from-violet/40 dark:to-violet/60 text-white p-2 rounded-lg transition-transform group-hover:scale-105">
                TR
              </span>
            </div>
            <div className="flex flex-col">
              <h2 className="text-base sm:text-lg md:text-xl font-extrabold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                TalentRadar.AI
              </h2>
              <small className="text-muted-foreground text-xs">
                Global Talent Readiness System
              </small>
            </div>
          </div>
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xs">
            Transforming talent assessment with AI-powered insights and
            comprehensive readiness scoring.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          <h3 className="font-semibold text-base sm:text-lg">Platform</h3>
          <nav className="flex flex-col gap-2 text-gray-400 text-xs sm:text-sm">
            <Link
              href="#"
              className="hover:text-foreground transition-colors duration-200"
            >
              Self Assessment
            </Link>
            <Link
              href="#"
              className="hover:text-foreground transition-colors duration-200"
            >
              Manager Feedback
            </Link>
            <Link
              href="#"
              className="hover:text-foreground transition-colors duration-200"
            >
              AI Analysis
            </Link>
            <Link
              href="#"
              className="hover:text-foreground transition-colors duration-200"
            >
              Productivity Scorecard
            </Link>
          </nav>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          <h3 className="font-semibold text-base sm:text-lg">Architecture</h3>
          <nav className="flex flex-col gap-2 text-gray-400 text-xs sm:text-sm">
            <Link
              href="#"
              className="hover:text-foreground transition-colors duration-200"
            >
              Microservices
            </Link>
            <Link
              href="#"
              className="hover:text-foreground transition-colors duration-200"
            >
              Event-Driven
            </Link>
            <Link
              href="#"
              className="hover:text-foreground transition-colors duration-200"
            >
              Cloud Native
            </Link>
            <Link
              href="#"
              className="hover:text-foreground transition-colors duration-200"
            >
              AI/ML Powered
            </Link>
          </nav>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4">
          <h3 className="font-semibold text-base sm:text-lg">Company</h3>
          <nav className="flex flex-col gap-2 text-gray-400 text-xs sm:text-sm">
            <Link
              href="#"
              className="hover:text-foreground transition-colors duration-200"
            >
              About Us
            </Link>
            <Link
              href="#"
              className="hover:text-foreground transition-colors duration-200"
            >
              Careers
            </Link>
            <Link
              href="#"
              className="hover:text-foreground transition-colors duration-200"
            >
              Contact
            </Link>
            <Link
              href="#"
              className="hover:text-foreground transition-colors duration-200"
            >
              Documentation
            </Link>
          </nav>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="container mx-auto text-center text-gray-500 text-xs sm:text-sm mt-8 sm:mt-10 lg:mt-12 xl:mt-16 px-4 sm:px-6 lg:px-8 xl:px-12 pt-6 sm:pt-8 border-t border-white/5">
        &copy; {new Date().getFullYear()} TalentRadar.AI. Revolutionizing talent
        readiness assessment.
      </div>
    </footer>
  );
}
