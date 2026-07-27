package com.backend.backend_java.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.backend_java.model.User;

public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findByUserName(String userName);

    boolean existsByUserName(String userName);

    boolean existsByUserEmail(String userEmail);
}