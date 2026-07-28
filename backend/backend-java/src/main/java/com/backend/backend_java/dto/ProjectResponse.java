package com.backend.backend_java.dto;

import java.time.LocalDate;
import java.util.UUID;

import com.backend.backend_java.model.Project;

public class ProjectResponse {
    private UUID id;
    private UUID userId;
    private String title;
    private String description;
    private Integer order;
    private LocalDate createdAd;
    private LocalDate updatedAd;

    public ProjectResponse(Project project) {
        this.id = project.getId();
        this.userId = project.getUserId();
        this.title = project.getTitle();
        this.description = project.getDescription();
        this.order = project.getOrder();
        this.createdAd = project.getCreatedAt();
        this.updatedAd = project.getUpdatedAt();
    }

    public LocalDate getCreatedAd() {
        return createdAd;
    }
    public void setCreatedAd(LocalDate createdAd) {
        this.createdAd = createdAd;
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
    public String getTitle() {
        return title;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public LocalDate getUpdatedAd() {
        return updatedAd;
    }
    public void setUpdatedAd(LocalDate updatedAd) {
        this.updatedAd = updatedAd;
    }
    public UUID getUserId() {
        return userId;
    }
    public void setUserId(UUID userId) {
        this.userId = userId;
    }
}
