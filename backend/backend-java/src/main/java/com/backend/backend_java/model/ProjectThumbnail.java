package com.backend.backend_java.model;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "ProjectThumbnails")
public class ProjectThumbnail {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false, name = "project_id")
    private UUID projectId;

    @Column(name = "photo", columnDefinition = "bytea")
    private byte[] photo;

    @Column(nullable = true, name = "photo_type")
    private String photoType;

    public UUID getId() {
        return id;
    }
    public UUID getProjectId() {
        return projectId;
    }
    public byte[] getPhoto() {
        return photo;
    }
    public String getPhotoType() {
        return photoType;
    }
    public void setProjectId(UUID projectId) {
        this.projectId = projectId;
    }
    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }
    public void setPhotoType(String photoType) {
        this.photoType = photoType;
    }      
}
