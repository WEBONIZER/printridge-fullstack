import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getPaginatedCartridges, Cartridge, CartridgeData } from "../../utils/api";

interface CartridgesState {
  items: Cartridge[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: CartridgesState = {
  items: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  },
  isLoading: false,
  error: null,
};

export const fetchCartridges = createAsyncThunk(
  "cartridges/fetchCartridges",
  async (params?: { page?: number; limit?: number; modelCart?: string; vendor?: string }, { rejectWithValue }) => {
    try {
      const response = await getPaginatedCartridges(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Ошибка загрузки картриджей");
    }
  }
);

export const cartridgesSlice = createSlice({
  name: "cartridges",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartridges.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCartridges.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchCartridges.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = cartridgesSlice.actions;
export default cartridgesSlice.reducer;

