import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, RoleEnum } from "../types/user-slice";

const initialState: AuthState = {
  id: null,
  email: null,
  userName: null,
  role: null,
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ id: string; email: string; username: string,role:RoleEnum, isAuthenticated: boolean }>
    ) => {
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.userName = action.payload.username;
      state.role = action.payload.role;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.id = null;
      state.email = null;
      state.userName = null;
      state.role = null
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;
