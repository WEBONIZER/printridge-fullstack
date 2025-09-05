import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  mobileMenuButton: boolean;
  feedbackModalButton: boolean;
  firstVisitModal: boolean;
}

const initialState: ModalState = {
  mobileMenuButton: false,
  feedbackModalButton: false,
  firstVisitModal: false,
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
    firstVisitModalState: (state, action: PayloadAction<boolean>) => {
      state.firstVisitModal = action.payload;
    },
  }
});
