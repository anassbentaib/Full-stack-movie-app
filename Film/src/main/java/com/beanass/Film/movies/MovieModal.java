package com.beanass.Film.movies;

import com.beanass.Film.config.ImageService;
import com.beanass.Film.reviews.ReviewModal;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.io.IOException;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "movies")

public class MovieModal {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;
    private String imdbId;
    @Transient
    private MultipartFile posterFile;

    // Getter and setter for the transient posterFile
    public MultipartFile getPosterFile() {
        return posterFile;
    }

    public void setPosterFile(MultipartFile posterFile) {
        this.posterFile = posterFile;
    }

    // Transient field
    @Transient
    private ImageService imageService;

    public void setImageService(ImageService imageService) {
        this.imageService = imageService;
    }

    // Method to trigger image upload
    public void uploadPoster() throws IOException {
        if (imageService != null && posterFile != null) {
            imageService.uploadMoviePoster(this);
        }
    }

   private String  trailerLink;
    private String releaseDate;
    private String description;
    private String title;
    private String poster;
    private String imdbTrailerLink;
    private String watchingType;
    @ElementCollection
    @CollectionTable(name = "movie_actors", joinColumns = @JoinColumn(name = "movie_id"))
    @Column(name = "actor")
    private List<String> actors;
    @ElementCollection
    @CollectionTable(name = "movie_genres", joinColumns = @JoinColumn(name = "movie_id"))
    @Column(name = "genre")
    private List<String> genres;

    private String type;
    private Integer season;
    private String rating;
    private String year;
    private String language;
    private String country;
    private Integer episode;
    private String awards;
    private String duration;
    @ElementCollection
    private List<String> directedby;
        @ManyToMany
        private List<ReviewModal> reviewsId;
    public String getImdbTrailerLink() {
        return imdbTrailerLink;
    }

    public void setImdbTrailerLink(String imdbTrailerLink) {
        this.imdbTrailerLink = imdbTrailerLink;
    }

    public String getWatchingType() {
        return watchingType;
    }

    public void setWatchingType(String watchingType) {
        this.watchingType = watchingType;
    }

    public List<String> getDirectedby() {
        return directedby;
    }

    public void setDirectedby(List<String> directedby) {
        this.directedby = directedby;
    }


    public Integer getSeason() {
        return season;
    }

    public void setSeason(Integer season) {
        this.season = season;
    }

    public Integer getEpisode() {
        return episode;
    }

    public void setEpisode(Integer episode) {
        this.episode = episode;
    }



    public List<String> getGenres() {
        return genres;
    }

    public void setGenres(List<String> genres) {
        this.genres = genres;
    }

    public List<String> getActors() {
        return actors;
    }

    public void setActors(List<String> actors) {
        this.actors = actors;
    }


    public String getRating() {
        return rating;
    }

    public void setRating(String rating) {
        this.rating = rating;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }


    public String getAwards() {
        return awards;
    }

    public void setAwards(String awards) {
        this.awards = awards;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }



    public String getImdbId() {
        return imdbId;
    }

    public void setImdbId(String imdbId) {
        this.imdbId = imdbId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }



    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }


    public String getTrailerLink() {
        return trailerLink;
    }

    public void setTrailerLink(String trailerLink) {
        this.trailerLink = trailerLink;
    }

    public String getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(String releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPoster() {
        return poster;
    }



    public void setPoster(String poster) {
        this.poster = poster;
    }


    public List<ReviewModal> getReviewsId() {
        return reviewsId;
    }

    public void setReviewsId(List<ReviewModal> reviewsId) {
        this.reviewsId = reviewsId;
    }

}

