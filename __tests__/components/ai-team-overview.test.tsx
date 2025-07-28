import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AITeamOverview } from "@/app/dashboard/ai-scores/components/ai-team-overview";
import { Mock, vi } from "vitest";
import * as reduxHooks from "@/lib/hooks";
import * as api from "@/lib/api/ai-analysis";
import { UserSummary } from "@/lib/types/ai-analysis";


const mockDispatch = vi.fn();

const mockMembers: UserSummary[] = [
  {
    userId: "user-1",
    icon: "icon1",
    readinessScore: 4,
    performanceLevel: "High Performer",
    averageScores: {
      communicationcollaboration: 3,
      executionresults: 4,
    },
    overallFeedback: "Doing great!",
  },
  {
    userId: "user-2",
    icon: "icon2",
    readinessScore: 2,
    performanceLevel: "Needs Improvement",
    averageScores: {
      communicationcollaboration: 2,
      executionresults: 1,
    },
    overallFeedback: "Needs more effort.",
  },
  {
    userId: "user-3",
    icon: "icon3",
    readinessScore: 5,
    performanceLevel: "Excellent",
    averageScores: {
      communicationcollaboration: 5,
      executionresults: 5,
    },
    overallFeedback: "Outstanding!",
  },
];

vi.mock("@/lib/hooks", async () => {
  const actual = await vi.importActual<typeof reduxHooks>("@/lib/hooks");
  return {
    ...actual,
    useAppSelector: vi.fn(),
    useAppDispatch: () => mockDispatch,
  };
});

vi.mock("@/lib/api/ai-analysis", () => ({
  fetchAiTeamResults: vi.fn(),
}));

describe("AITeamOverview", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display top 2 members and a View All button", async () => {
    (reduxHooks.useAppSelector as unknown as Mock).mockImplementation((selector: any) =>
      selector({ aiScores: { developersScores: mockMembers } })
    );

    render(<AITeamOverview />);
    expect(screen.getByText(/user-1/i)).toBeInTheDocument();
    expect(screen.getByText(/user-2/i)).toBeInTheDocument();
    expect(screen.queryByText(/user-3/i)).not.toBeInTheDocument();

    const viewAllButton = screen.getByRole("button", { name: /view all/i });
    expect(viewAllButton).toBeInTheDocument();

    fireEvent.click(viewAllButton);
    expect(await screen.findByText(/user-3/i)).toBeInTheDocument();
  });

  it("should call fetchAiTeamResults and dispatch data", async () => {
    (api.fetchAiTeamResults as unknown as Mock).mockResolvedValue(mockMembers);

    (reduxHooks.useAppSelector as unknown as Mock).mockImplementation((selector : any) =>
      selector({ aiScores: { developersScores: [] } })
    );

    render(<AITeamOverview />);

    await waitFor(() => {
      expect(api.fetchAiTeamResults).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: mockMembers,
        type: "aiScores/setDevelopersScores",
      });
    });
  });

  it("should show Show Less button when all users are displayed", async () => {
    (reduxHooks.useAppSelector as unknown as Mock).mockImplementation((selector: any) =>
      selector({ aiScores: { developersScores: mockMembers } })
    );

    render(<AITeamOverview />);
    fireEvent.click(screen.getByRole("button", { name: /view all/i }));
    expect(await screen.findByRole("button", { name: /show less/i })).toBeInTheDocument();
  });
});
