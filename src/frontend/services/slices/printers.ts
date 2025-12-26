import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPaginatedPrinters, Printer } from "../../utils/api";

interface PrintersState {
  items: Printer[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: PrintersState = {
  items: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  },
  isLoading: false,
  error: null,
};

export const fetchPrinters = createAsyncThunk(
  "printers/fetchPrinters",
  async (params?: { page?: number; limit?: number; vendor?: string; model?: string; hasImage?: string; hasLinkedCartridges?: string; public?: string }, { rejectWithValue }) => {
    try {
      const response = await getPaginatedPrinters(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Ошибка загрузки принтеров");
    }
  }
);

export const printersSlice = createSlice({
  name: "printers",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrinters.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPrinters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchPrinters.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = printersSlice.actions;
export default printersSlice.reducer;

