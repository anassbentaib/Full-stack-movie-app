package com.beanass.Film.reviews;


import com.beanass.Film.movies.MovieModal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/reviews")
@CrossOrigin(origins = "http://localhost:5173")

public class ReviewController {
    @Autowired
    private ReviewService reviewService;
    @PostMapping("/create-review")
        public ResponseEntity<ReviewModal> addReview(@RequestBody Map<String, String> payload) {
            String username = payload.get("username");
            String id = payload.get("id");
            String reviewBody = payload.get("reviewBody");

            return new ResponseEntity<>(reviewService.createReview(reviewBody, Integer.parseInt(id), username),
                    HttpStatus.CREATED);
        }
    @GetMapping("/get-reviews/{id}")
    public ResponseEntity<List<ReviewModal>> getReviewsByMovieId(@PathVariable Integer id) {
        List<ReviewModal> reviews = reviewService.findReviewsByMovieId(id);
        reviews.sort(Comparator.comparing(ReviewModal::getCreatedAt, Comparator.nullsLast(Comparator.reverseOrder())));

        return new ResponseEntity<>(reviews, HttpStatus.OK);
    }
//        @GetMapping("/get-reviews")
//        public ResponseEntity<List<ReviewModal>> getAllMovies(Integer id) {
//
//            return reviewService.getAllReviews(id);
//        }

//    public ResponseEntity<ReviewModal> addReview(@RequestBody Map<String, String> payload) {
//        String id = payload.get("id");
//        return new ResponseEntity<>(reviewService.createReview(payload.get("reviewBody"), Integer.parseInt(id)),
//                HttpStatus.CREATED);
//    }
}
