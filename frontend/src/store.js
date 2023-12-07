import { configureStore } from '@reduxjs/toolkit';
import reviewsReducer from './features/reviewSlice';
import movieReducer from './features/moviesSlice';

export const store = configureStore({
  reducer: {
    reviews: reviewsReducer,
    movies: movieReducer,

  },
});

export default store;
