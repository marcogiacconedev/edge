package com.backend.backend_java.repository;

import java.util.List;
import java.util.UUID;

import com.backend.backend_java.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, UUID>{
    List<Project> findByUserId(UUID userId);
}
