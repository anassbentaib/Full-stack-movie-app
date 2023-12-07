package com.beanass.Film.config;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import java.util.stream.Collectors;
import org.springframework.security.core.GrantedAuthority;

import java.security.Key;
import java.util.*;


@Component
public class TokenGenerator {
    private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

    public String generateToken(Authentication authentication){
        String email = authentication.getName();
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();

        List<String> roles = authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());
        Date currentDate = new Date();
        Date expireDate = new
                Date(currentDate.getTime()+
                SecurityConstant.JWT_EXPIRATION);
        String token = Jwts.builder()
                .setSubject(email)
                .claim("roles", roles) // Add roles to the claims

                .setIssuedAt(new Date())
                .setExpiration(expireDate)
                .signWith(key)  // Use the generated key here
                .compact();

        return token;
    }
    public String getEmailFromJwt(String token){
        Claims claims = Jwts.parser()
                .setSigningKey(SecurityConstant.JWT_SECRET)
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();

    }
    public boolean ValidationToken(String token){
        try{
            Jwts
                    .parser()
                    .setSigningKey(SecurityConstant.JWT_SECRET)
                    .parseClaimsJws(token);
            return true;
        }catch (Exception e){
            throw new AuthenticationCredentialsNotFoundException("JWT was expired or incorrect.");
        }
    }
}


//public class TokenGenerator {
//    private static final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
//    private final UserRepository userRepository;
//
//    @Autowired
//    public TokenGenerator(UserRepository userRepository) {
//        this.userRepository = userRepository;
//    }
//
//    public String generateToken(Authentication authentication){
//        String email = authentication.getName();
//        Date currentDate = new Date();
//        Date expireDate = new Date(currentDate.getTime() + SecurityConstant.JWT_EXPIRATION);
//
//        // Fetch the user from the database
//        Optional<UserEntity> userOptional = userRepository.findByEmail(email);
//
//        if (userOptional.isEmpty()) {
//            throw new UsernameNotFoundException("User not found with email: " + email);
//        }
//
//        UserEntity user = userOptional.get();
//
//        // Collect role names from the user's roles
//        List<String> roleNames = user.getRoles().stream().map(Role::getName).collect(Collectors.toList());
//
//        // Include roles in the token claims
//        Map<String, Object> claims = new HashMap<>();
//        claims.put("roles", roleNames);
//
//        String token = Jwts.builder()
//                .setSubject(email)
//                .setIssuedAt(new Date())
//                .addClaims(claims)  // Include roles in the token claims
//                .setExpiration(expireDate)
//                .signWith(key)  // Use the generated key here
//                .compact();
//
//        return token;
//    }