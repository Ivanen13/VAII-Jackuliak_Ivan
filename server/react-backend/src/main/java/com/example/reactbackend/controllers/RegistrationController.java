package com.example.reactbackend.controllers;

import com.example.reactbackend.others.RegistrationRequest;
import com.example.reactbackend.Users.User;
import com.example.reactbackend.Users.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@RestController
@RequestMapping("/api")
public class RegistrationController {

    @Autowired
    private UserService userService;
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegistrationRequest request) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Referrer-Policy", "no-referrer-when-downgrade");

        System.out.println("Username: " + request.getUsername());
        System.out.println("Email: " + request.getEmail());
        System.out.println("Password: " + request.getPassword());
        try {
            User user = userService.registerUser(
                request.getUsername(),
                request.getEmail(),
                request.getPassword()
            );
            return ResponseEntity.ok(Map.of("message","Registrácia bola úspešná!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message",e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody RegistrationRequest request) {
        try {
            User user = userService.loginUser(
                request.getEmail(),
                request.getPassword()
            );

            return ResponseEntity.ok(Map.of(
                "message", "Prihlásenie bolo úspešné!",
                "username", user.getUsername(),
                "email", user.getEmail()
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", e.getMessage()));
        }
    }

}
