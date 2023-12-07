package com.beanass.Film.movies;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/movies")
@CrossOrigin(origins = "http://localhost:5173")

public class MovieController {
    @Autowired
    private MoviesService moviesService;

    @GetMapping("/get-movies")
    @CrossOrigin(origins = "http://localhost:5173")

    public ResponseEntity<List<MovieModal>> getAllMovies() {

        return moviesService.getAllMovies();
    }

    @PostMapping("/create-movie")

    public ResponseEntity<String> addMovie(@RequestPart("posterFile") MultipartFile posterFile,
                                           @ModelAttribute MovieModal movie) {
        movie.setPosterFile(posterFile);
        return moviesService.addMovieWithPoster(movie);
    }

    @PutMapping("/update-movie/{id}")

    public ResponseEntity<String> updateMovie(@PathVariable Integer id, @RequestBody MovieModal updatedMovie) {
        return moviesService.updateMovie(updatedMovie, id);

    }

    @DeleteMapping("/delete-movie/{id}")

    public ResponseEntity<String> deleteMovie(@PathVariable Integer id) {
        return
                moviesService.deleteMovie(id);
    }

    @GetMapping("/get-movie/{id}")
    public ResponseEntity<MovieModal> getMovieById(@PathVariable Integer id) {

        return moviesService.getMovieById(id);
    }

@GetMapping("/get-movies/{genre}")
public ResponseEntity<List<MovieModal>> getMoviesByGenre(@PathVariable String genre) {
    List<MovieModal> movies = moviesService.getMoviesByGenre(genre);
    return new ResponseEntity<>(movies, HttpStatus.OK);
}

@GetMapping("/get-mevie/{watchingType}")
    public ResponseEntity <MovieModal> getMovieByType(@PathVariable String watchingType){
        return  moviesService.getMovieByWatchingType(watchingType);

}



}