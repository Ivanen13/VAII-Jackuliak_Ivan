package com.example.reactbackend.Users;

import com.example.reactbackend.Users.User;
import com.example.reactbackend.Users.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User registerUser(String username, String email, String password) {

        if (userRepository.findByUsername(username) != null) {
            throw new IllegalArgumentException("Užívateľské meno už existuje");
        }
        if (userRepository.findByEmail(email) != null) {
            throw new IllegalArgumentException("Email už existuje");
        }

        User user = new User();
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        return userRepository.save(user);
    }

    public User loginUser(String email, String password) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            throw new IllegalArgumentException("Nesprávne zadané údaje.");
        }

        if(!passwordEncoder.matches(password, user.getPassword())) {
            throw new IllegalArgumentException("Nesprávne heslo.");
        }

        return user;
    }
    @Transactional
    public void deleteUser(String email) {
        userRepository.deleteByEmail(email);
    }

}
