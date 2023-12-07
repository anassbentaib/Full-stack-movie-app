import * as api from "../api/index";
import { createAsyncThunk, createAction } from "@reduxjs/toolkit";

export const createReview = createAsyncThunk(
  "reviews/createReview",
  async ({ id, reviewBody, username }, { rejectWithValue, dispatch }) => {
    try {
      const response = await api.createReview(reviewBody, username, id);
      dispatch(addNewReview(response.data));

      return response.data;
    } catch (error) {
      console.error("Server Error:", error.response || "Unknown error");
      return rejectWithValue(error.response?.data || "Unknown error");
    }
  }
);
const addNewReview = createAction("reviews/addNewReview");

export const getReviews = createAsyncThunk(
  "reviews/getReviews",
  async (movieId, { rejectWithValue }) => {
    try {
      const response = await api.getReviews(movieId);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
