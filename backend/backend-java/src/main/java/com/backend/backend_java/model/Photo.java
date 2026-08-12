package com.backend.backend_java.model;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "photos")
public class Photo {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false, name = "project_id")
    private UUID projectId;

    @Column(nullable = true, name = "title")
    private String title;

    @Column(nullable = true, name = "description")
    private String description;

    @Column(name = "photo", columnDefinition = "bytea")
    private byte[] photo;

    @Column(nullable = true, name = "taken_at")
    private LocalDate takenAt;

    @Column(nullable = true, name = "updated_at")
    private LocalDate updatedAt;

    @Column(nullable = true, name = "place")
    private String place;

    @Column(nullable = true, name = "list_order")
    private Integer order;

    @Column(nullable = true, name = "photo_type")
    private String photoType;

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
    public byte[] getPhoto() {
        return photo;
    }
    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }
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
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public LocalDate getUpdatedAt() {
        return updatedAt;
    }
    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }
}
