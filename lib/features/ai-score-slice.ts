import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserSummary } from "../types/ai-analysis";

const initialState: { developersScores: UserSummary[] } = {
  developersScores: [],
};
const AIScoresSlice = createSlice({
  name: "aiScores",
  initialState,
  reducers: {
    setDevelopersScores: (state, action: PayloadAction<UserSummary[]>) => {
      state.developersScores = action.payload;
    },
  },
});
export default AIScoresSlice.reducer;
export const { setDevelopersScores } = AIScoresSlice.actions;
