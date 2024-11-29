package com.example.reactbackend.others;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User registerUser(String username, String email, String password) {
        if (userRepository.findByUsername(username) != null) {
            throw new IllegalArgumentException("Užívateľské meno už existuje");
        }
        if (userRepository.findByEmail(email) != null) {
            throw new IllegalArgumentException("Email už existuje");
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String hashedPassword = encoder.encode(password);

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(hashedPassword);
        return userRepository.save(user);
    }
}
