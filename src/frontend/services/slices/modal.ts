import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  mobileMenuButton: boolean;
  feedbackModalButton: boolean;
}

const initialState: ModalState = {
  mobileMenuButton: false,
  feedbackModalButton: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    mobileMenuButtonState: (state, action: PayloadAction<boolean>) => {
      state.mobileMenuButton = action.payload;
    },
    feedbackButtonState: (state, action: PayloadAction<boolean>) => {
      state.feedbackModalButton = action.payload;
    },
  }
});
