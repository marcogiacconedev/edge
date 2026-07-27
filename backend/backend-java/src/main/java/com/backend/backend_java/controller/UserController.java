package com.backend.backend_java.controller;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.backend_java.dto.UserResponse;
import com.backend.backend_java.service.UserService;

@RestController
@RequestMapping
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @GetMapping("users/{id}") 
    public ResponseEntity<UserResponse> getUser(@PathVariable UUID id) {
        UserResponse user = userService.getUserById(id);
        
        return ResponseEntity.ok(user);
    }
}
