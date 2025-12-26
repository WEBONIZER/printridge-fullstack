import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getPaginatedExamples, Example } from "../../utils/api";

interface ExamplesState {
  items: Example[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
  };
  isLoading: boolean;
  error: string | null;
}

const initialState: ExamplesState = {
  items: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  },
  isLoading: false,
  error: null,
};

export const fetchExamples = createAsyncThunk(
  "examples/fetchExamples",
  async (params?: { page?: number; limit?: number; title?: string; cartridgeId?: string; printerId?: string; laptopId?: string; public?: string }, { rejectWithValue }) => {
    try {
      const response = await getPaginatedExamples(params);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.error || "Ошибка загрузки примеров");
    }
  }
);

export const examplesSlice = createSlice({
  name: "examples",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExamples.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchExamples.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data;
        state.pagination = action.payload.pagination;
        state.error = null;
      })
      .addCase(fetchExamples.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = examplesSlice.actions;
export default examplesSlice.reducer;

