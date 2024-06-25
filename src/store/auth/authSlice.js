import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checking",
    user: {},
    errorMessage: undefined,
    users: [],
    profile: [],
  },
  reducers: {
    onChecking: (state) => {
      state.status = "checking";
      state.user = {};
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }) => {
      state.status = "authenticated";
      state.user = payload;
      state.profile = payload.profile;
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }) => {
      state.status = "not-authenticated";
      state.user = {};
      state.errorMessage = payload;
    },
    onClearMessage: (state) => {
      state.errorMessage = undefined;
    },
    onPopulateUsers: (state, { payload }) => {
      state.users = payload;
    },
    onUpdateProfile: (state, { payload }) => {
      state.profile = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onChecking,
  onLogin,
  onLogout,
  onClearMessage,
  onPopulateUsers,
  onUpdateProfile,
} = authSlice.actions;
