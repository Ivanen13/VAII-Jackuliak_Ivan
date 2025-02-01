package com.example.reactbackend.controllers;

import com.example.reactbackend.Users.BodyRequest;
import com.example.reactbackend.Users.User;
import com.example.reactbackend.Users.UserService;
import com.example.reactbackend.others.Reward;
import com.example.reactbackend.others.RewardService;
import com.example.reactbackend.others.Tokens;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class RewardController {
    private final RewardService rewardService;
    private final UserService userService;
    private String token;

    public RewardController(RewardService rewardService, UserService userService) {
        this.rewardService = rewardService;
        this.userService = userService;
    }

    @GetMapping("/getRewards")
    public ResponseEntity<?> rewards(@RequestHeader("Authorization") String authHeader) {
        if(validation(authHeader) != null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "zly token"));
        List<Reward> rewards = rewardService.getAllRewards();
        return ResponseEntity.ok(rewards);
    }

    @PostMapping("/admin")
    public ResponseEntity<?> getAdminDashboard(@RequestBody BodyRequest request, @RequestHeader("Authorization") String authHeader) {

        if(validation(authHeader) != null)
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "zly token"));

        try {
            User user = userService.getUser(request.getEmail());
            if(user.getRole().getName().equals("Admin")) {
                rewardService.createReward(request.getCount(), request.getDescription());
                ResponseEntity.ok(Map.of(
                    "message", "Odmena vytvorena"
                ));
            }

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "iba Admin"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
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
