package com.backend.backend_java.dto;

import java.time.LocalDate;

public class UpdatePhotoRequest {
    private String title;
    private String description;
    private Integer order;
    private LocalDate takenAt;
    private String place;

    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public Integer getOrder() {
        return order;
    }
    public void setOrder(Integer order) {
        this.order = order;
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
    public String getPlace() {
        return place;
    }
    public void setPlace(String place) {
        this.place = place;
    }
}
