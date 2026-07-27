package com.backend.backend_java.service;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.backend.backend_java.dto.LoginRequest;
import com.backend.backend_java.dto.LoginResponse;
import com.backend.backend_java.dto.SignupRequest;
import com.backend.backend_java.dto.UserResponse;
import com.backend.backend_java.model.User;
import com.backend.backend_java.util.JwtUtil;

@Service
public class AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserService userService,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public UserResponse signup(SignupRequest request) {
        if (userService.existsByUsername(request.getUsername())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username già in uso");
        }
        if (userService.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email già in uso");
        }

        String passHash = passwordEncoder.encode(request.getPassword());
        User saved = userService.createUser(request.getUsername(), request.getEmail(), passHash);
        return new UserResponse(saved);
    }

    public LoginResponse login(LoginRequest request) {
        User user = userService.findByUsername(request.getUsername());
        if (user == null || !passwordEncoder.matches(request.getPassword(), user.getPassHash())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Credenziali non valide");
        }

        String token = jwtUtil.generateToken(user.getId(), user.getUserName(), user.getUserRole());
        return new LoginResponse(token);
    }
}
