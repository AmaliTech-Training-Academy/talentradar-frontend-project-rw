
import { render, screen, fireEvent } from "@testing-library/react";
import { CardTabs } from "@/app/dashboard/ai-scores/components/card-tabs";
import { vi, describe, it, beforeEach, afterEach } from "vitest";

vi.mock("@/lib/types/ai-analysis", async () => {
  const actual = await vi.importActual<any>("@/lib/types/ai-analysis");
  const mockModule = await import("../__mocks__/skillConfig");
  return {
    ...actual,
    skillConfig: mockModule.skillConfig,
    configColors: mockModule.configColors,
  };
});

vi.mock("@/app/dashboard/ai-scores/components/skill-item", () => ({
  SkillItem: ({ label, score }: any) => (
    <div data-testid="skill-item">
      <p>{label}</p>
      <p>{score}</p>
    </div>
  ),
}));
vi.mock("@/app/dashboard/ai-scores/components/member-feedback", () => ({
  MemberFeedback: ({ feedback }: any) => <p>{feedback}</p>,
}));

const mockMember = {
  userId: "user-1",
  icon: "icon1",
  readinessScore: 5,
  performanceLevel: "Excellent",
  averageScores: {
    communicationcollaboration: 4,
    executionresults: 5,
  },
  overallFeedback: "You're performing well.",
};

beforeEach(() => {
  vi.clearAllMocks();
});
afterEach(() => {
  vi.clearAllMocks();
});

describe("CardTabs Component", () => {
  it("renders all tab triggers", () => {
    render(<CardTabs member={mockMember} />);
    expect(screen.getByRole("tab", { name: /Overview/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /Analytics/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /Data Sources/i })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: /AI Insights/i })).toBeInTheDocument();
  });

  it("renders skill items in Overview tab", () => {
    render(<CardTabs member={mockMember} />);
    expect(screen.getByText("Communication & Collaboration")).toBeInTheDocument();
    expect(screen.getByText("4")).toBeInTheDocument();
    expect(screen.getByText("Execution & Results")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("renders member feedback if available", () => {
    render(<CardTabs member={mockMember} />);
    expect(screen.getByText(mockMember.overallFeedback)).toBeInTheDocument();
  });

});
