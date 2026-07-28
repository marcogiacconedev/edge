package com.backend.backend_java.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.backend_java.model.Photo;

public interface PhotoRepository extends JpaRepository<Photo, UUID> {
    List<Photo> findByProjectId(UUID projectId);
}
