package com.backend.backend_java.dto;

import java.util.UUID;

import com.backend.backend_java.model.User;

public class UserResponse {
    private UUID id;
    private String userName;
    private String userEmail;
    private String role;

    public UserResponse(User user) {
        this.id = user.getId();
        this.userName = user.getUserName();
        this.userEmail = user.getUserEmail();
        this.role = user.getUserRole();
    }

    public UUID getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public String getRole() {
        return role;
    }
}
