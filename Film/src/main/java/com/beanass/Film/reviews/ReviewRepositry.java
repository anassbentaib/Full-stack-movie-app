package com.beanass.Film.reviews;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepositry extends JpaRepository<ReviewModal , Integer> {
    Object findAllById(Integer id);


    @Query("SELECT m.reviewsId FROM MovieModal m WHERE m.id = :id")
    List<ReviewModal> findReviewsByMovieId(@Param("id") Integer id);

}
