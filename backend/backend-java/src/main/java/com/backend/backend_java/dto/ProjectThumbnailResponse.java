package com.backend.backend_java.dto;

import java.util.UUID;

import com.backend.backend_java.model.ProjectThumbnail;

public class ProjectThumbnailResponse {
    private final UUID id;
    private final UUID projectId;
    private final String photoType;

    public ProjectThumbnailResponse(ProjectThumbnail projectThumbnail) {
        this.id = projectThumbnail.getId();
        this.projectId = projectThumbnail.getProjectId();
        this.photoType = projectThumbnail.getPhotoType();
    }

    public UUID getId() {
        return id;
    }

    public String getPhotoType() {
        return photoType;
    }

    public UUID getProjectId() {
        return projectId;
    }
}
