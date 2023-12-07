package com.beanass.Film.movies;

import javax.persistence.*;


@Entity
public class MovieGenre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "movie_id")
    private MovieModal movie;

    private String genre;
}
