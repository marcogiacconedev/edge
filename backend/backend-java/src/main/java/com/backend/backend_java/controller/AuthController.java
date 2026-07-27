package com.backend.backend_java.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend_java.dto.LoginRequest;
import com.backend.backend_java.dto.LoginResponse;
import com.backend.backend_java.dto.SignupRequest;
import com.backend.backend_java.dto.UserResponse;
import com.backend.backend_java.service.AuthService;

@RestController
@RequestMapping("auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("signup")
    public ResponseEntity<UserResponse> signup(@RequestBody SignupRequest request) {
        return ResponseEntity.ok(authService.signup(request));
    }

    @PostMapping("login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    // logout no-op: il client cestina il token, il server non ha stato da pulire.
    @PostMapping("logout")
    public ResponseEntity<Void> logout() {
        return ResponseEntity.noContent().build();
    }
}
