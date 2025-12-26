import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPaginatedLaptops, Laptop } from "../../utils/api";

interface LaptopsState {
  items: Laptop[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: LaptopsState = {
  items: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  },
  isLoading: false,
  error: null,
};

export const fetchLaptops = createAsyncThunk(
  "laptops/fetchLaptops",
  async (params?: { page?: number; limit?: number; vendor?: string; model?: string; hasImage?: string; public?: string }, { rejectWithValue }) => {
    try {
      const response = await getPaginatedLaptops(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Ошибка загрузки ноутбуков");
    }
  }
);

export const laptopsSlice = createSlice({
  name: "laptops",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLaptops.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLaptops.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchLaptops.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = laptopsSlice.actions;
export default laptopsSlice.reducer;

