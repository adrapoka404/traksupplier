import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isDateModalOpen: false,
    isProfileModalOpen: false,
  },
  reducers: {
    onOpenDateModal: (state) => {
      state.isDateModalOpen = true;
    },
    onCloseDateModal: (state) => {
      state.isDateModalOpen = false;
    },
    onOpenProfileModal: (state) => {
      state.isProfileModalOpen = true;
    },
    onCloseProfileModal: (state) => {
      state.isProfileModalOpen = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  onOpenDateModal,
  onCloseDateModal,
  onOpenProfileModal,
  onCloseProfileModal,
} = uiSlice.actions;
