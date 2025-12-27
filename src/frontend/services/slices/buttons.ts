import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ButtonsState {
  photoButton: string;
  videoButton: string;
}

const initialState: ButtonsState = {
  photoButton: 'photo',
  videoButton: '',
};

export const buttonsSlice = createSlice({
  name: "buttons",
  initialState,
  reducers: {
    setPhotoButton: (state, action: PayloadAction<string>) => {
      state.photoButton = action.payload;
    },
    setVideoButton: (state, action: PayloadAction<string>) => {
      state.videoButton = action.payload;
    },
  },
});

export const { setPhotoButton, setVideoButton } = buttonsSlice.actions;
export default buttonsSlice.reducer;

