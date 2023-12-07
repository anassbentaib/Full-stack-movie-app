import * as api from "../api/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getMovieById = createAsyncThunk(
  "movies/getMovieById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getMovieById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    isLoading: false,
    movie: null,
    error: null,
  },
  reducers: {
    clearMovieData: (state) => {
      state.movie = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovieById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMovieById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movie = action.payload;
      })
      .addCase(getMovieById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearMovieData } = movieSlice.actions;
export default movieSlice.reducer;
