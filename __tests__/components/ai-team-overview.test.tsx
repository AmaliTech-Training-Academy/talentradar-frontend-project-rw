import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as api from "@/lib/api/ai-analysis";
import { setDevelopersScores } from "@/lib/features/ai-score-slice";
import { AITeamOverview } from "@/app/dashboard/ai-scores/components/ai-team-overview";
import { UserSummary } from "@/lib/types/ai-analysis";

// Mock store setup
const middlewares = [thunk as any];
const mockStore = configureStore(middlewares);



jest.mock("@/lib/api/ai-analysis", () => ({
  fetchAiTeamResults: jest.fn(),
}));

// Helper to render with Redux provider
function renderWithStore(store: any) {
  return render(
    <Provider store={store}>
      <AITeamOverview />
    </Provider>
  );
}

describe("AITeamOverview", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the component with no data (empty state)", () => {
    const store = mockStore({ aiScores: { developersScores: [] } });
    renderWithStore(store);

    // Should not render any cards
    expect(screen.queryByText(/AI Readiness Analysis/i)).not.toBeInTheDocument();
    // Should render the heading
    expect(screen.getByText(/AI Scores - Team Overview/i)).toBeInTheDocument();
  });

  it("should render the correct number of cards (2 by default, all when 'View All' is clicked)", () => {
    const mockMembers: UserSummary[] = [
      {
        userId: "user1",
        icon: "icon1",
        readinessScore: 85,
        performanceLevel: "High Performer",
        averageScores: { technical: 90, communication: 80, teamwork: 85 },
        overallFeedback: "Excellent performance",
      },
      {
        userId: "user2",
        icon: "icon2",
        readinessScore: 70,
        performanceLevel: "Medium Performer",
        averageScores: { technical: 75, communication: 65, teamwork: 70 },
        overallFeedback: "Good, but room for improvement",
      },
      {
        userId: "user3",
        icon: "icon3",
        readinessScore: 60,
        performanceLevel: "Low Performer",
        averageScores: { technical: 60, communication: 55, teamwork: 65 },
        overallFeedback: "Needs improvement",
      },
    ];
    const store = mockStore({ aiScores: { developersScores: mockMembers } });
    renderWithStore(store);

    // Should render only 2 cards by default
    expect(screen.getAllByText(/AI Readiness Analysis/i)).toHaveLength(2);

    // Click "View All"
    fireEvent.click(screen.getByText(/View All/i));
    // Now all 3 cards should be rendered
    expect(screen.getAllByText(/AI Readiness Analysis/i)).toHaveLength(3);

    // Click "Show Less"
    fireEvent.click(screen.getByText(/Show Less/i));
    // Back to 2 cards
    expect(screen.getAllByText(/AI Readiness Analysis/i)).toHaveLength(2);
  });

  it("should display the correct badge and score for each member", () => {
    const mockMembers: UserSummary[] = [
      {
        userId: "user1",
        icon: "icon1",
        readinessScore: 85,
        performanceLevel: "High Performer",
        averageScores: { technical: 90, communication: 80, teamwork: 85 },
        overallFeedback: "Excellent performance",
      },
      {
        userId: "user2",
        icon: "icon2",
        readinessScore: 70,
        performanceLevel: "Medium Performer",
        averageScores: { technical: 75, communication: 65, teamwork: 70 },
        overallFeedback: "Good, but room for improvement",
      },
    ];
    const store = mockStore({ aiScores: { developersScores: mockMembers } });
    renderWithStore(store);

    // Check scores
    expect(screen.getByText("85")).toBeInTheDocument();
    expect(screen.getByText("70")).toBeInTheDocument();

    // Check badges
    expect(screen.getByText("High Performer")).toBeInTheDocument();
    expect(screen.getByText("Medium Performer")).toBeInTheDocument();
  });

  it("should call the API and dispatch the result to the store", async () => {
    const mockMembers: UserSummary[] = [
      {
        userId: "user1",
        icon: "icon1",
        readinessScore: 85,
        performanceLevel: "High Performer",
        averageScores: { technical: 90, communication: 80, teamwork: 85 },
        overallFeedback: "Excellent performance",
      },
    ];
    // @ts-ignore
    api.fetchAiTeamResults.mockResolvedValueOnce(mockMembers);

    const store = mockStore({ aiScores: { developersScores: [] } });
    renderWithStore(store);

    // Wait for API and dispatch
    await waitFor(() => {
      const actions = store.getActions();
      expect(api.fetchAiTeamResults).toHaveBeenCalled();
      expect(actions).toContainEqual(setDevelopersScores(mockMembers));
    });
  });
});