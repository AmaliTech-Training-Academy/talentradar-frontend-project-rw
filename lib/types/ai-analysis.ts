export interface AverageScores {
  [key: string]: number;
}

export interface UserSummary {
  userId: string;
  readinessScore: number;
  performanceLevel: string;
  averageScores: AverageScores;
  overallFeedback: string;
}