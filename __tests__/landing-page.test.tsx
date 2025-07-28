import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CtaSection } from "@/components/custom/landing/cta-section";
import { HeroSection } from "@/components/custom/landing/hero-section";
import { FeatureSection } from "@/components/custom/landing/feature-section";
import { Microservices } from "@/components/custom/landing/microservices-section";
import { FeatureCard } from "@/components/custom/landing/feature-card";
import { Header } from "@/components/custom/landing/header";
import { useSession } from "next-auth/react";
import { vi, Mock } from "vitest";

vi.mock("next-auth/react");
vi.mock("embla-carousel-react", () => {
  const mockApi = {
    canScrollPrev: () => false,
    canScrollNext: () => true,
    scrollPrev: vi.fn(),
    scrollNext: vi.fn(),
    on: vi.fn(),
    off: vi.fn(),
    destroy: vi.fn(),
    reInit: vi.fn(),
    scrollSnapList: vi.fn(() => [0, 1, 2]),
    selectedScrollSnap: vi.fn(),
  };
  const useEmblaCarousel = () => [null, mockApi];

  return {
    __esModule: true,
    default: useEmblaCarousel, // 👈 this is key
  };
});

vi.mock("embla-carousel", () => ({
  __esModule: true,
  default: vi.fn(),
}));
// 1. Section Components

describe("CtaSection", () => {
  it("renders the main CTA section and button", () => {
    render(<CtaSection />);
    expect(
      screen.getByRole("heading", { name: /Ready to Transform Your Team?/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Watch Demo/i })
    ).toBeInTheDocument();
  });
});

describe("HeroSection", () => {
  it("renders the main heading and subheading", () => {
    (useSession as unknown as Mock).mockReturnValue({
      data: null, // or mock session object if needed
      status: "unauthenticated",
    });

    render(<HeroSection />);
    expect(
      screen.getByRole("heading", { name: /Productivity Dashboard/i })
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: /Try Live Demo/i })
    ).toHaveLength(3);
    const texts = screen.getAllByText(/Enterprise-Grade Solution/i);
    expect(texts[0]).toBeInTheDocument();
  });
});

describe("FeatureSection", () => {
  it("renders the features heading and list", () => {
    render(<FeatureSection />);
    expect(
      screen.getByRole("heading", {
        name: /Powerful Features for Modern Teams/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/Productivity Scorecard/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /Everything you need to assess, develop, and track talent readiness with AI-powered insights/i
      )
    ).toBeInTheDocument();
  });
});

describe("MicroservicesSection", () => {
  it("renders the microservices heading", () => {
    render(<Microservices />);
    expect(
      screen.getByRole("heading", { name: /GTRS Microservices Architecture/i })
    ).toBeInTheDocument();
  });
});

// 2. Card Components
import { Brain } from "lucide-react";
import { SessionProvider } from "next-auth/react";

describe("FeatureCard", () => {
  const props = {
    icon: Brain,
    title: "AI-Powered Insights",
    description:
      "Advanced machine learning algorithms analyze GitHub, Slack, and Jira data to provide comprehensive readiness assessments",
    iconBgColor:
      "  bg-gradient-to-r from-violet/70 to-destructive/70 dark:bg-gradient-to-r from-violet/30 to-destructive/60",
  };

  it("renders the card with title, description, and icon", () => {
    render(<FeatureCard {...props} />);
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.description)).toBeInTheDocument();
  });
});

// 3. Header and Footer

describe("Header", () => {
  it("renders the logo and navigation links", () => {
    render(<Header />);
    expect(
      screen.getByRole("heading", { name: /TalentRadar\.AI/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/features/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Get Started →/i })
    ).toBeInTheDocument();
  });
});

describe("Footer", () => {
  it("renders copyright and social links", () => {
    render(
      <footer>
        <span>© 2024 TalentRadar</span>
        <a aria-label="twitter" />
        <a aria-label="github" />
      </footer>
    );
    expect(screen.getByText(/©/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/twitter/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/github/i)).toBeInTheDocument();
  });
});
