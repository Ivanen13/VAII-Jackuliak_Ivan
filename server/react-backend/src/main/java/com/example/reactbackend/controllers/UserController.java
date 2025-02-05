package com.example.reactbackend.controllers;

import com.example.reactbackend.Users.BodyRequest;
import com.example.reactbackend.Users.User;
import com.example.reactbackend.Users.UserService;
import com.example.reactbackend.others.Tokens;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;
    private String token;
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody BodyRequest request) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Referrer-Policy", "no-referrer-when-downgrade");

        try {
            User user = userService.registerUser(request.getUsername(), request.getEmail(), request.getPassword());

            return ResponseEntity.ok(Map.of("message","Registrácia bola úspešná!"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message",e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody BodyRequest request) {
        try {
            User user = userService.loginUser(request.getEmail(), request.getPassword());
            boolean admin = false;
             if(user.getRole().getName().equals("Admin"))
                 admin = true;

            String token = Tokens.generateToken(request.getUsername());

            return ResponseEntity.ok(Map.of(
                "message", "Prihlásenie bolo úspešné!",
                "username", user.getUsername(),
                "email", user.getEmail(),
                "money", user.getMoney(),
                "token", token,
                "admin",admin
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteUser(@RequestBody Map<String, String> request, @RequestHeader("Authorization") String authHeader) {

        validation(authHeader);

        String email = request.get("email");
        try {
            userService.deleteUser(email);
            return ResponseEntity.ok(Map.of("message", "Používateľ bol úspešne vymazaný."));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody BodyRequest request, @RequestHeader("Authorization") String authHeader) {

        if(validation(authHeader) != null)
            return validation(authHeader);

        try {
            User user = userService.updateUser(request.getEmail(), request.getPassword(), request.getUsername());

            return ResponseEntity.ok(Map.of(
                "message", "Zmena mena bola úspešná!",
                "username", user.getUsername(),
                "email", user.getEmail(),
                "token",token
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }
    @PostMapping("/addCredit")
    public int addCredit(@RequestBody BodyRequest request) {
        try {
            User user = userService.getUser(request.getEmail());
            System.out.println("email " + request.getEmail());

            user.setMoney(10);
            userService.saveUser(user);
        } catch (IllegalArgumentException e) {
            return 0;
        }
        return 10;
    }

    @PostMapping("/buy")
    public int buy (@RequestBody BodyRequest request) {
        try {
            User user = userService.getUser(request.getEmail());
            if(user.getMoney() < 99)
                return -1;
            user.setMoney(-100);
            userService.saveUser(user);
        } catch (IllegalArgumentException e) {
            return 0;
        }
        return 10;
    }

    private ResponseEntity<?> validation(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Chýba JWT token");
        }

        token = authHeader.replace("Bearer ", "");
        if (!Tokens.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Neplatný alebo expirovaný token");
        }
        return null;
    }
}
