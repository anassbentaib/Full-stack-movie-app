import { combineReducers } from "redux";

import movies from "./movies.js";
import reviews from "./reviews.js";
export const reducers = combineReducers({ reviews, movies });
