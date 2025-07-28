import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CardTabs } from "@/app/dashboard/ai-scores/components/card-tabs";

// Mock member prop for CardTabs
const mockMember = {
  userId: "user-1",
  icon: "icon1",
  readinessScore: 5,
  performanceLevel: "Excellent",
  averageScores: {
    JavaScript: 4,
    React: 5,
  },
  overallFeedback: "Great job on the recent project!",
};

describe("CardTabs Component", () => {
  it("should render all tabs (Overview, Analytics, Data Sources, AI Insights)", () => {
    render(<CardTabs member={mockMember} />);
    expect(screen.getByRole("tab", { name: /Overview/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /Analytics/i })).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: /Data Sources/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: /AI Insights/i })
    ).toBeInTheDocument();
  });

  it("should show skill items in the Overview tab", () => {
    render(<CardTabs member={mockMember} />);
    // Overview tab is active by default
    expect(screen.getByText("JavaScript")).toBeInTheDocument();
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should show feedback if present", () => {
    render(<CardTabs member={mockMember} />);
    expect(screen.getByText(mockMember.overallFeedback)).toBeInTheDocument();
  });

  it("should display placeholder text in other tabs", () => {
    render(<CardTabs member={mockMember} />);
    // Switch to Analytics tab
    fireEvent.click(screen.getByRole("tab", { name: /Analytics/i }));
    expect(screen.getByText(/Analytics data coming soon/i)).toBeInTheDocument();

    // Switch to Data Sources tab
    fireEvent.click(screen.getByRole("tab", { name: /Data Sources/i }));
    expect(
      screen.getByText(/Data sources information coming soon/i)
    ).toBeInTheDocument();

    // Switch to AI Insights tab
    fireEvent.click(screen.getByRole("tab", { name: /AI Insights/i }));
    expect(screen.getByText(/AI insights coming soon/i)).toBeInTheDocument();
  });
});
