import React, { useEffect, useState } from "react";
import { getMovieByGenres } from "../../api";
import PostCard from "./PostCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Text } from "@chakra-ui/react";
import "swiper/css/effect-coverflow";
import { A11y, Pagination, Navigation } from "swiper/modules";
import { PuffLoader } from "react-spinners";

const SuggestMovies = ({ postData }) => {
  const [suggestedMovies, setSuggestedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSuggestedMovies = async () => {
    if (postData) {
      setLoading(true);
      try {
        const allGenres = postData.genres;
        const genreCombinations = getAllGenreCombinations(allGenres);

        let allMovies = [];

        for (const genres of genreCombinations) {
          const response = await getMovieByGenres(genres);
          allMovies = allMovies.concat(response.data);
        }

        const uniqueMovies = Array.from(
          new Set(allMovies.map((movie) => movie.id))
        ).map((id) => allMovies.find((movie) => movie.id === id));

        setSuggestedMovies(uniqueMovies);
      } catch (error) {
        console.error("Error fetching suggested movies:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  const getAllGenreCombinations = (genres) => {
    const result = [];
    for (let i = 0; i < genres.length; i++) {
      for (let j = i + 1; j <= genres.length; j++) {
        result.push(genres.slice(i, j));
      }
    }
    return result;
  };
  useEffect(() => {
    fetchSuggestedMovies();
  }, [postData]);

  const recommendedMovies = suggestedMovies.filter(
    (movie) => movie.id !== postData.id
  );
  return (
    <div className="m-auto p-5">
      <Text fontWeight="bold" fontSize="clamp(1rem, 1.3vw, 1.3rem)">
        Recommended for you
      </Text>
      {loading ? (
        <div className="h-[70vh] flex flex-col items-center  justify-center">
          <PuffLoader size={70} color="red" />
        </div>
      ) : (
        suggestedMovies.length && (
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={10}
            slidesPerView="auto"
          >
            {recommendedMovies.map((movie, i) => (
              <SwiperSlide
                key={i}
                className="min-w-[250px] max-w-[300px] min-h-[300px]"
              >
                <PostCard postData={movie} height="350px" width="100%" />
              </SwiperSlide>
            ))}
          </Swiper>
        )
      )}
    </div>
  );
};

export default SuggestMovies;
