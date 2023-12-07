package com.beanass.Film.movies;

import com.beanass.Film.reviews.ReviewModal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository

    public interface MovieRepositry extends JpaRepository<MovieModal, Integer> {
    MovieModal findMovieById(Integer id);
    @Query("SELECT m FROM MovieModal m JOIN m.genres g WHERE g = ?1")

    List<MovieModal> findByGenresContains(@Param("genre") String genre);

    Optional<MovieModal> findByWatchingType(String watchingType);


}
