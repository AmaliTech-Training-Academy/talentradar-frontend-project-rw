import { createSlice } from "@reduxjs/toolkit";
import { Session, SessionPagination } from "../types/sessions";
import { User } from "../types";

const initialState: {
  sessions: SessionPagination<Session> | null;
  users: User[] | null;
} = {
  sessions: null,
  users: null,
};
const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    setCacheUsers: (state, action: { payload: User[] }) => {
      state.users = action.payload;
    },
    setCacheSessions: (
      state,
      action: { payload: SessionPagination<Session> }
    ) => {
      state.sessions = action.payload;
    },
    clearSessions: (state) => {
      state.sessions = null;
      state.users = null;
    },
  },
});

export const { setCacheUsers, setCacheSessions, clearSessions } =
  sessionsSlice.actions;
export default sessionsSlice.reducer;
