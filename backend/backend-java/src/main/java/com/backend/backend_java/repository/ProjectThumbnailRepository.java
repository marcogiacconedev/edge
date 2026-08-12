package com.backend.backend_java.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.backend_java.model.ProjectThumbnail;

public interface ProjectThumbnailRepository extends JpaRepository<ProjectThumbnail, UUID>{
    ProjectThumbnail findByProjectId(UUID projectId);
}
