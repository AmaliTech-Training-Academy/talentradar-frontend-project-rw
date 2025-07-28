import aiScoresReducer, {
  setDevelopersScores,
} from "../../lib/features/ai-score-slice";
import { UserSummary } from "../../lib/types/ai-analysis";

describe("ai-score-slice", () => {
  const initialState = { developersScores: [] };

  it("should return the initial state", () => {
    expect(aiScoresReducer(undefined, { type: "" })).toEqual(
      initialState
    );
  });

  it("should handle setDevelopersScores and update the state with the provided payload", () => {
    const mockScores = [
      {
        userId: "user1",
        icon: "icon1",
        readinessScore: 3.5,
        performanceLevel: "High",
        averageScores: {
          technical: 5,
          communication: 4,
          teamwork: 5,
        },
        overallFeedback: "Excellent performance",
      },
      {
        userId: "user2",
        icon: "icon2",
        readinessScore: 3.7,
        performanceLevel: "Medium",
        averageScores: {
          technical: 3,
          communication: 4,
          teamwork: 3,
        },
        overallFeedback: "Good, but room for improvement",
      },
    ];

    const nextState = aiScoresReducer(
      initialState,
      setDevelopersScores(mockScores)
    );
    expect(nextState.developersScores).toEqual(mockScores);
  });
});