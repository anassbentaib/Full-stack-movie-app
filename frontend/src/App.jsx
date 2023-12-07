import React from "react";
import { Box } from "@chakra-ui/react";
import { bg } from "./assets";
import { SearchProvider } from "./components/NavHome/Navbar/SearchContext";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  AdminDashboard,
  Auth,
  DashboardPage,
  Footer,
  Home,
  MovieDetails,
  MoviePage,
  Reviews,
  Trailer,
  isAuth,
} from "./components";

export default function App() {
  return (
    <SearchProvider>
      <BrowserRouter>
        <Box w="100%" mx="auto" minH="800vh" flex-direction="column">
          <Box
            flex-direction="column"
            minH="800vh"
            background="linear-gradient(to bottom, #3f255f, #170231)"
            overflow="hidden"
            z-index="1"
            position="relative"
          >
            {!isAuth && <Home />}

            <Routes>
              <Route path="/register" element={<Auth />} />
              <Route path="/admin-dahboard" element={<AdminDashboard />} />
              <Route path="/trailer/:ytTrailerId" element={<Trailer />} />

              <Route
                path="/admin-dashboard/new"
                element={<MoviePage mode="create" />}
              />
              <Route
                path="/admin-dashboard/:id"
                element={<MoviePage mode="update" />}
              />
              <Route path="/movies/:movie/:id" element={<MovieDetails />} />
              <Route path="/" element={<DashboardPage />} />
              <Route path="/:movie/:id/reviews" element={<Reviews />} />
            </Routes>
          </Box>
          {!isAuth && <Footer />}
        </Box>
      </BrowserRouter>
    </SearchProvider>
  );
}
