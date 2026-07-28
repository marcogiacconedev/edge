package com.backend.backend_java.dto;

import java.time.LocalDate;
import java.util.UUID;

import com.backend.backend_java.model.Photo;

public class PhotoResponse {
    private UUID id;
    private UUID projectId;
    private String title;
    private String description;
    // private byte[] photo;
    private LocalDate takenAt;
    private LocalDate updatedAt;
    private String place;
    private Integer order;
    private String photoType;

    public PhotoResponse(Photo photo) {
        this.id = photo.getId();
        this.projectId = photo.getProjectId();
        this.title = photo.getTitle();
        this.description = photo.getDescription();
        // this.photo = photo.getPhoto();
        this.takenAt = photo.getTakenAt();
        this.updatedAt = photo.getUpdatedAt();
        this.place = photo.getPlace();
        this.order = photo.getOrder();
        this.photoType = photo.getPhotoType();
    }

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public UUID getId() {
        return id;
    }
    public void setId(UUID id) {
        this.id = id;
    }
    public Integer getOrder() {
        return order;
    }
    public void setOrder(Integer order) {
        this.order = order;
    }
    // public byte[] getPhoto() {
    //     return photo;
    // }
    // public void setPhoto(byte[] photo) {
    //     this.photo = photo;
    // }
    public String getPhotoType() {
        return photoType;
    }
    public void setPhotoType(String photoType) {
        this.photoType = photoType;
    }
    public String getPlace() {
        return place;
    }
    public void setPlace(String place) {
        this.place = place;
    }
    public UUID getProjectId() {
        return projectId;
    }
    public void setProjectId(UUID projectId) {
        this.projectId = projectId;
    }
    public LocalDate getTakenAt() {
        return takenAt;
    }
    public void setTakenAt(LocalDate takenAt) {
        this.takenAt = takenAt;
    }
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public LocalDate getUpdatedAt() {
        return updatedAt;
    }
    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }
}
