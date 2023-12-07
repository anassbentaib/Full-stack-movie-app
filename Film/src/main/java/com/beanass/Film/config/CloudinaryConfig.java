package com.beanass.Film.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.provisioning.Account;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Value("${cloudinary.cloud-name}")
    private String cloudName;

    @Value("${cloudinary.api-key}")
    private String apiKey;

    @Value("${cloudinary.api-secret}")
    private String apiSecret;

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(Cloudinary.asMap(
                "dcq0jzieu", cloudName,
                "193245424521856", apiKey,
                "BPyTyjF8yfmCiXFdBmtLZ0gjlkw", apiSecret
        ));
    }

}
