package com.backend.backend_java.service;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.backend.backend_java.dto.UserResponse;
import com.backend.backend_java.model.User;
import com.backend.backend_java.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserResponse getUserById(UUID id) {
        User user = userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserResponse(user);
    }

    // --- usato da AuthService ---

    public User findByUsername(String username) {
        return userRepository.findByUserName(username)
                .orElse(null);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUserName(username);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByUserEmail(email);
    }

    public User createUser(String username, String email, String passHash) {
        User user = new User();
        user.setUserName(username);
        user.setUserEmail(email);
        user.setPassHash(passHash);
        return userRepository.save(user);
    }
}
