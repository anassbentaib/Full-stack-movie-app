package com.beanass.Film.users.user;

import com.beanass.Film.config.AuthResponseDTO;
import com.beanass.Film.config.TokenGenerator;
import com.beanass.Film.users.roles.Role;
import com.beanass.Film.users.roles.RolesRepositry;
import com.beanass.Film.users.user.login.LoginDTO;
import com.beanass.Film.users.user.register.RegisterDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;

@RestController
    @RequestMapping(path = "/api/v1/auth")
    @CrossOrigin("http://localhost:5173")
    public class UserController {
        private AuthenticationManager authenticationManager;
        private UserRepository userRepository;
    private TokenGenerator tokenGenerator;

        private RolesRepositry rolesRepositry;
        private PasswordEncoder passwordEncoder;


        @Autowired
        public UserController(
                TokenGenerator tokenGenerator,
                AuthenticationManager authenticationManager,
                UserRepository userRepository,
                              RolesRepositry rolesRepository,
                              PasswordEncoder passwordEncoder
        ) {
            this.tokenGenerator = tokenGenerator;
            this.userRepository = userRepository;
            this.authenticationManager = authenticationManager;
            this.rolesRepositry = rolesRepository;
            this.passwordEncoder = passwordEncoder;
        }

        @PostMapping("login")
    public ResponseEntity<AuthResponseDTO> login(@RequestBody LoginDTO loginDto){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));

        SecurityContextHolder
                .getContext()
                .setAuthentication(authentication);
        String token = tokenGenerator.generateToken(authentication);

        return new ResponseEntity<>(new AuthResponseDTO(token), HttpStatus.OK);

    }


        @PostMapping("register")
        public ResponseEntity<String> register(@RequestBody RegisterDTO registerDto) {
            if (registerDto.getPassword() == null) {
                return new ResponseEntity<>("Password cannot be null", HttpStatus.BAD_REQUEST);
            }

            if (userRepository.existsByEmail(registerDto.getEmail())) {
                return new ResponseEntity<>("email already taken!", HttpStatus.BAD_REQUEST);
            }

//            UserEntity user = new UserEntity();
//            user.setUsername(registerDto.getUsername());
//            user.setEmail(registerDto.getEmail());
//            user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
//
//            Role userRole = rolesRepositry.findByName("USER").orElse(null);
//            Role adminRole = rolesRepositry.findByName("ADMIN").orElse(null);
//
//            if (userRole == null || adminRole == null) {
//                return new ResponseEntity<>("Roles not found", HttpStatus.INTERNAL_SERVER_ERROR);
//            }
//
//            user.setRoles(Collections.singletonList(userRole));
            UserEntity user = new UserEntity();
            user.setUsername(registerDto.getUsername());
            user.setEmail(registerDto.getEmail());
            user.setPassword(passwordEncoder.encode(registerDto.getPassword()));

            Role roles = rolesRepositry.findByName("USER").orElse(null);

            if (roles == null) {
                return new ResponseEntity<>("Role not found", HttpStatus.INTERNAL_SERVER_ERROR);
            }

            user.setRoles(Collections.singletonList(roles));

            userRepository.save(user);
            return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);

        }
    }