import { END_LOADING, FETCH_MOVIE_BY_ID, START_LOADING } from "../constants";

export default (state = { isLoading: true, movies: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };

    case FETCH_MOVIE_BY_ID:
      return { ...state, movie: action.payload.movie };


      default:
      return state;
  }
};
