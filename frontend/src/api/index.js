import axios from "axios";

const baseURL = "http://localhost:8080/api/v1";
const API = axios.create({ baseURL });

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    req.headers.Authorization = `Bearer ${user.user.accessToken}`;
  }

  return req;
});

export const signUp = (form) => axios.post(`${baseURL}/auth/register`, form);
export const signIn = (form) => axios.post(`${baseURL}/auth/login`, form);

export const getAllMovies = () => axios.get(`${baseURL}/movies/get-movies`);
export const createMovie = (formData) =>
  API.post(`${baseURL}/movies/create-movie`, formData);

export const updateMovie = (movieId) =>
  API.put(`${baseURL}/movies/update-movie/${movieId}`);

export const deleteMovie = (id) =>
  API.delete(`${baseURL}/movies/delete-movie/${id}`);

export const getMovieById = (id) =>
  axios.get(`${baseURL}/movies/get-movie/${id}`);

export const getMovieByGenres = (genres) =>
  axios.get(`${baseURL}/movies/get-movies/${genres}`);

export const createReview = (reviewBody, username, id) =>
  API.post(`${baseURL}/reviews/create-review`, {
    reviewBody,
    username,
    id,
  });

export const getReviews = (id) =>
  axios.get(`${baseURL}/reviews/get-reviews/${id}`);
