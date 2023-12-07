import Footer from "./footer/Footer";
import Home from "./NavHome/Home";
import DashboardPage from "./Dashboard/Page";
import Auth from "./auth/Auth";
import AdminDashboard from "./Admin/AdminDashboard";
import MoviePage from "./Admin/movie/movie";
import MovieDetails from "./Dashboard/MovieDetails/MovieDetails";
import Trailer from "./Dashboard/MovieDetails/Trailer";
import Reviews from "./Dashboard/Reviews/Reviews";

export {
  Footer,
  Home,
  DashboardPage,
  Auth,
  MoviePage,
  MovieDetails,
  Trailer,
  Reviews,
  AdminDashboard,
};

export const isAuth = location.pathname === "/register";
