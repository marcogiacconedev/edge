package com.backend.backend_java.model;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="Users")
public class User {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(
        nullable = false,
        unique = true,
        name = "user_name"
    )
    private String userName;

    @Column(
        nullable = false,
        unique = true,
        name = "user_email"
    )
    private String userEmail;

    @Column(
        nullable = false,
        name = "pass_hash"
    )
    private String passHash;

    @Column(
        nullable = false,
        name = "user_role"
    )
    private String userRole = "USER";

    //getters and setters

    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }

    public String getUserEmail() {
        return userEmail;
    }
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getPassHash() {
        return passHash;
    }
    public void setPassHash(String passHash) {
        this.passHash = passHash;
    }

    public String getUserName() {
        return userName;
    }
    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserRole() {
        return userRole;
    }
    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }
}
