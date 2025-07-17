import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaginationState {
  [tableKey: string]: number;
}

const initialState: PaginationState = {};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<{ key: string; page: number }>) => {
      state[action.payload.key] = action.payload.page;
    },
    resetPage: (state, action: PayloadAction<string>) => {
      state[action.payload] = 0;
    },
  },
});

export const { setPage, resetPage } = paginationSlice.actions;
export default paginationSlice.reducer;
