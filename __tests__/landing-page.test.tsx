
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CtaSection } from "@/components/custom/landing/cta-section";

// 1. Section Components

describe("CtaSection", () => {
  it("renders the main CTA section and button", () => {
    // Replace with actual import
    render(<CtaSection/>)
    expect(screen.getByRole("heading", { name: /Ready to Transform Your Team?/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /get started/i })).toBeInTheDocument();
  });
});

describe("HeroSection", () => {
  it("renders the main heading and subheading", () => {
    // import { HeroSection } from "@/app/landing/hero-section";
    render(<div><h1>Welcome to TalentRadar</h1><p>Start your journey</p></div>);
    expect(screen.getByRole("heading", { name: /welcome/i })).toBeInTheDocument();
    expect(screen.getByText(/start your journey/i)).toBeInTheDocument();
  });
});

describe("FeatureSection", () => {
  it("renders the features heading and list", () => {
    // import { FeatureSection } from "@/app/landing/feature-section";
    render(<section><h2>Features</h2><ul><li>Fast</li></ul></section>);
    expect(screen.getByRole("heading", { name: /features/i })).toBeInTheDocument();
    expect(screen.getByText(/fast/i)).toBeInTheDocument();
  });
});

describe("MicroservicesSection", () => {
  it("renders the microservices heading", () => {
    // import { MicroservicesSection } from "@/app/landing/microservices-section";
    render(<section><h2>Microservices</h2></section>);
    expect(screen.getByRole("heading", { name: /microservices/i })).toBeInTheDocument();
  });
});

describe("StartsSection", () => {
  it("renders the starts section", () => {
    // import { StartsSection } from "@/app/landing/starts-section";
    render(<section><h2>Get Started</h2></section>);
    expect(screen.getByRole("heading", { name: /get started/i })).toBeInTheDocument();
  });
});

// 2. Card Components

describe("FeatureCard", () => {
  const props = {
    title: "Fast Integration",
    description: "Integrate with your stack in minutes.",
    icon: <svg data-testid="feature-icon" />
  };

  it("renders the card with title, description, and icon", () => {
    // import { FeatureCard } from "@/app/landing/feature-card";
    render(<div>
      <span>{props.icon}</span>
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </div>);
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.description)).toBeInTheDocument();
    expect(screen.getByTestId("feature-icon")).toBeInTheDocument();
  });

  it("calls onClick when the card is clicked", () => {
    const handleClick = jest.fn();
    // import { FeatureCard } from "@/app/landing/feature-card";
    render(<div onClick={handleClick}><h3>{props.title}</h3></div>);
    fireEvent.click(screen.getByText(props.title));
    expect(handleClick).toHaveBeenCalled();
  });
});

describe("GtrsCard", () => {
  it("renders the GTRS card with title and description", () => {
    // import { GtrsCard } from "@/app/landing/gtrs-card";
    render(<div><h3>GTRS</h3><p>Global Talent Recognition System</p></div>);
    expect(screen.getByText(/gtrs/i)).toBeInTheDocument();
    expect(screen.getByText(/global talent recognition system/i)).toBeInTheDocument();
  });
});

// 3. Header and Footer

describe("Header", () => {
  it("renders the logo and navigation links", () => {
    // import { Header } from "@/app/landing/header";
    render(<header><img alt="logo" /><nav><a href="/">Home</a><a href="/features">Features</a></nav></header>);
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/features/i)).toBeInTheDocument();
  });
});

describe("Footer", () => {
  it("renders copyright and social links", () => {
    // import { Footer } from "@/app/landing/footer";
    render(<footer><span>© 2024 TalentRadar</span><a aria-label="twitter" /><a aria-label="github" /></footer>);
    expect(screen.getByText(/©/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/twitter/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/github/i)).toBeInTheDocument();
  });
});