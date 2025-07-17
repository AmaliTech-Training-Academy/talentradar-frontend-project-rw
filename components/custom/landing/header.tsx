"use client";

import { ModeToggle } from "@/components/custom/mode-toggle";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border dark:bg-gradient-to-r from-violet/20 to-violet/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo Section */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            onClick={closeMobileMenu}
          >
            <div className="flex items-center gap-2">
              <div className="font-bold text-lg sm:text-xl">
                <span className="bg-violet dark:from-violet/40 dark:to-violet/60 text-white p-2 rounded-lg transition-transform group-hover:scale-105">
                  TR
                </span>
              </div>
              <div className="flex flex-col">
                <h2 className="text-lg sm:text-xl font-extrabold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  TalentRadar.AI
                </h2>
                <small className="text-muted-foreground text-xs hidden sm:block">
                  Global Talent Readiness System
                </small>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8 ">
            <Link
              href="/"
              className="text-sm font-medium  hover:text-foreground transition-colors duration-200 relative group"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-500 transition-all duration-200 group-hover:w-full"></span>
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium  hover:text-foreground transition-colors duration-200 relative group"
            >
              About
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-500 transition-all duration-200 group-hover:w-full"></span>
            </Link>

            <Button
              asChild
              className="bg-violet  dark:bg-gradient-to-r from-primary/60 to-violet/80 text-white  transition-all duration-200 shadow-lg hover:shadow-violet/50/25"
            >
              <Link href="/login">Get Started →</Link>
            </Button>
            <ModeToggle />
          </nav>

          {/* Mobile Menu Button & Theme Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="hidden sm:block"></div>
            <Button
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-accent"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="py-6 space-y-6">
              {/* Mobile Navigation Links */}
              <nav className="space-y-4">
                <Link
                  href="/"
                  className="block py-3 px-4 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all duration-200"
                  onClick={closeMobileMenu}
                >
                  Features
                </Link>
                <Link
                  href="/about"
                  className="block py-3 px-4 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-all duration-200"
                  onClick={closeMobileMenu}
                >
                  About
                </Link>
              </nav>

              {/* Mobile Actions Section */}
              <div className="pt-6 border-t border-border space-y-4">
                <Button
                  asChild
                  className="w-full bg-violet dark:from-violet/60 dark:to-violet/80 text-white hover:opacity-90 hover:shadow-violet/50/25  transition-all duration-200 shadow-lg"
                  onClick={closeMobileMenu}
                >
                  <Link href="/login">Get Started →</Link>
                </Button>

                {/* Mobile Theme Toggle (only show on small screens) */}
                <div className="sm:hidden flex items-center justify-between py-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Theme
                  </span>
                  <ModeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
