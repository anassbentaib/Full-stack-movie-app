package com.beanass.Film.movies;

import com.beanass.Film.config.ImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
@Service
public class MoviesService {
    @Autowired
    MovieRepositry movieRepositry;
    @Autowired
    ImageService imageService;

//    public ResponseEntity<String> addMovie(MovieModal movie) {
//        movieRepositry.save(movie);
//        return new ResponseEntity<>("success", HttpStatus.CREATED);
//    }
public ResponseEntity<String> addMovieWithPoster(MovieModal movie) {
    try {
        movie.uploadPoster(); // This triggers image upload
        movieRepositry.save(movie);
        return new ResponseEntity<>("success", HttpStatus.CREATED);
    } catch (IOException e) {
        // Handle the exception
        return new ResponseEntity<>("Error uploading poster", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
    public ResponseEntity<List<MovieModal>> getAllMovies() {
        try {
            return new ResponseEntity<>(movieRepositry.findAll(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<String> updateMovie(MovieModal updatedMovie, Integer id) {
        Optional<MovieModal> existingMovieOptional = movieRepositry.findById(id);

        if (existingMovieOptional.isPresent()) {
            MovieModal existingMovie = existingMovieOptional.get();

            existingMovie.setTrailerLink(updatedMovie.getTrailerLink());
            existingMovie.setReleaseDate(updatedMovie.getReleaseDate());
            existingMovie.setType(updatedMovie.getType());
            existingMovie.setDescription(updatedMovie.getDescription());
            existingMovie.setRating(updatedMovie.getRating());
            //5
            existingMovie.setTitle(updatedMovie.getTitle());
            existingMovie.setPoster(updatedMovie.getPoster());
            existingMovie.setActors(updatedMovie.getActors());
            existingMovie.setAwards(updatedMovie.getAwards());
            //4
            existingMovie.setWatchingType(updatedMovie.getWatchingType());
            existingMovie.setDuration(updatedMovie.getDuration());
            existingMovie.setCountry(updatedMovie.getCountry());
            existingMovie.setEpisode(updatedMovie.getEpisode());
            existingMovie.setSeason(updatedMovie.getSeason());
            //5
            existingMovie.setDirectedby(updatedMovie.getDirectedby());
            existingMovie.setGenres(updatedMovie.getGenres());
            existingMovie.setImdbTrailerLink(updatedMovie.getImdbTrailerLink());
            existingMovie.setLanguage(updatedMovie.getLanguage());
            existingMovie.setYear(updatedMovie.getYear());

            // Save the updated movie
            movieRepositry.save(existingMovie);

            return new ResponseEntity<>("updated", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Movie not found", HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<String> deleteMovie(Integer id) {
        Optional<MovieModal> movieOptional = movieRepositry.findById(id);

        if (movieOptional.isPresent()) {
            movieRepositry.deleteById(id);
            return new ResponseEntity<>("deleted", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Movie not found", HttpStatus.NOT_FOUND);
        }
    }

    public ResponseEntity<MovieModal> getMovieById(@PathVariable Integer id) {
        Optional<MovieModal> movieOptional = movieRepositry.findById(id);

        if (movieOptional.isPresent()) {
            MovieModal movie = movieOptional.get();
            return new ResponseEntity<>(movie, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    public List<MovieModal> getMoviesByGenre(String genre) {
        List<MovieModal> movies = movieRepositry.findByGenresContains(genre);
        return movies;
    }

    public ResponseEntity<MovieModal> getMovieByWatchingType(@PathVariable String watchingType) {
    Optional <MovieModal> movieModalOptional = movieRepositry.findByWatchingType(watchingType);
    if (movieModalOptional.isPresent()){
        MovieModal movieModal = movieModalOptional.get();
        return new ResponseEntity<>(movieModal, HttpStatus.OK);
    }else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    }
}