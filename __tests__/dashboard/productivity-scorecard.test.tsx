import { getByRole, render, screen } from "@testing-library/react";
import { WelcomeCard } from "@/app/dashboard/productivity-scorecard/components/welcome-card";
import { InfoCard } from "@/app/dashboard/productivity-scorecard/components/info-card";
import Page from "@/app/dashboard/productivity-scorecard/page";
import { Info } from "../__mocks__/lucide_react";
import { AiInsights } from "@/app/dashboard/components/ai-insights";

describe("Productivity Scorecard Page", () => {
  it("should render the page correctly", () => {
    render(<Page />);
    expect(
      screen.getByRole("heading", {
        name: "Developer Productivity Scorecard",
      })
    ).toBeInTheDocument();
  });

  it("should render Welcome component correctly", async () => {
    render(<WelcomeCard />);
    expect(
      screen.getByRole("heading", {
        name: "Developer Productivity Scorecard",
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/filter/i)).toBeInTheDocument();
    expect(screen.getByText(/comprehensive/gi)).toBeInTheDocument();
    expect(screen.getByText("Overall score")).toBeInTheDocument();
  });
  it("should render InfoCard components", () => {
    const infocardData = {
      colors: ["#4A90E2", "#50E3C2"],
      title: "Test Card",
      Icon: Info,
      description: "This is a test card",
      trendingVal: 5,
    };
    render(<InfoCard data={infocardData} />);
    expect(screen.getByText(infocardData.title)).toBeInTheDocument();
    expect(screen.getByText(infocardData.description)).toBeInTheDocument();
    expect(screen.getByText(infocardData.trendingVal)).toBeInTheDocument();
    expect(screen.getByTestId("Info-icon")).toBeInTheDocument();
  });
  it("should render AI Insights component", () => {
    render(<AiInsights />);
    // screen.debug();
    expect(
      screen.getByRole("heading", { name: "AI Insights & Recommendations" })
    ).toBeInTheDocument();
  });
});
