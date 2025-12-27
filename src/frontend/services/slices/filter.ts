import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FilterState {
  filter: any[];
  value: string;
}

const initialState: FilterState = {
  filter: [],
  value: '',
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    clearFilter: (state) => {
      state.value = '';
      state.filter = [];
    },
  },
});

export const { setSearchValue, clearFilter } = filterSlice.actions;
export default filterSlice.reducer;

