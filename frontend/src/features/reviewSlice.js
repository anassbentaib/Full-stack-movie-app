import { createSlice } from "@reduxjs/toolkit";
import { createReview, getReviews } from "../action/reviews";

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: { isLoading: false, reviews: [], error: null },
  reducers: {
    addNewReview: (state, action) => {
      state.reviews = [...state.reviews, action.payload];
    },
    clearReviewsData: (state) => {
      state.reviews = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE
      .addCase(createReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = [...state.reviews, action.payload.reviewBody];
      })
      .addCase(createReview.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // GET
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.review = action.payload;
      })
      .addCase(getReviews.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearReviewsData } = reviewsSlice.actions;

export default reviewsSlice.reducer;
