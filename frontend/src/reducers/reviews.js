import {
  CREATE_REVIEW,
  END_LOADING,
  GET_REVIEWS,
  START_LOADING,
} from "../constants";

export default (state = { isLoading: true, reviews: [] }, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case GET_REVIEWS:
      return { ...state, review: action.payload.review };
    case CREATE_REVIEW:
    // return { ...state, reviews: [...state.reviews, action.payload] };
    case CREATE_REVIEW:
      return {
        ...state,
        reviews: [...state.reviews, action.payload.reviewBody],
      };

    default:
      return state;
  }
};
