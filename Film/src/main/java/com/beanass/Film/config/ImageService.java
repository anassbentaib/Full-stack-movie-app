package com.beanass.Film.config;

import com.beanass.Film.movies.MovieModal;
import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class ImageService {

    @Autowired
    private Cloudinary cloudinary;

    public String uploadImage(MultipartFile posterFile) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(posterFile.getBytes(), ObjectUtils.emptyMap());
        return (String) uploadResult.get("secure_url");
    }
    public String uploadMoviePoster(MovieModal movie) throws IOException {
        if (movie.getPosterFile() != null) {
            String secureUrl = uploadImage(movie.getPosterFile());
            movie.setPoster(secureUrl);
            return secureUrl;
        }
        return null;
    }

    public String generateImageUrl(String publicId) {
        return cloudinary.url().transformation(new Transformation().width(300).height(300).crop("fill")).generate(publicId);
    }
}
