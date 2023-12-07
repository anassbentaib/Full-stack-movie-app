package com.beanass.Film.reviews;

import com.beanass.Film.movies.MovieModal;
import com.beanass.Film.movies.MovieRepositry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepositry reviewRepositry;

    @Autowired
    private MovieRepositry movieRepositry;
//    public ReviewModal createReview(String reviewBody, Integer id, String username) {
//        ReviewModal reviewModal = new ReviewModal(reviewBody, username);
//        reviewModal = reviewRepositry.save(reviewModal);
//
//        MovieModal movie = movieRepositry.findMovieById(id);
//
//        if (movie != null) {
//            movie.getReviewsId().add(reviewModal);
//            movieRepositry.save(movie);
//        }
//
//        return reviewModal;
//    }
public ReviewModal createReview(String reviewBody, Integer id, String username) {
    ReviewModal reviewModal = new ReviewModal(reviewBody, username);
    reviewModal = reviewRepositry.save(reviewModal);

    MovieModal movie = movieRepositry.findMovieById(id);

    if (movie != null) {
        movie.getReviewsId().add(reviewModal);
        movieRepositry.save(movie);
    }

    return reviewModal;
}

    public List<ReviewModal> findReviewsByMovieId(Integer id) {
        return reviewRepositry.findReviewsByMovieId(id);
    }
//    public ResponseEntity<List<ReviewModal>> getAllReviews(Integer movieId) {
//        try {
//            List<MovieModal> movies = movieRepositry.findReviewsByMovieId(movieId);
//
//            if (movies.isEmpty()) {
//                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//            }
//
//            // Assuming each movie has a list of reviews
//            List<ReviewModal> reviews = movies.get(0).getReviewsId();
//            return new ResponseEntity<>(reviews, HttpStatus.OK);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//        }
//    }


//    public ReviewModal createReview(String reviewBody, Integer id) {
//        ReviewModal reviewModal = new ReviewModal(reviewBody);
//        reviewModal = reviewRepositry.save(reviewModal);
//
//        MovieModal movie = movieRepositry.findMovieById(id);
//
//        if (movie != null) {
//            movie.getReviewsId().add(reviewModal);
//            movieRepositry.save(movie);
//        }
//
//        return reviewModal;
//    }

}
