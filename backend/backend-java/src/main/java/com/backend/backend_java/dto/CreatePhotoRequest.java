package com.backend.backend_java.dto;

import java.time.LocalDate;

public class CreatePhotoRequest {
    private String title;
    private String description;
    private LocalDate takenAt;
    private String place;
    private Integer order;

    public String getDescription() {
        return description;
    }
    public Integer getOrder() {
        return order;
    }
    public String getPlace() {
        return place;
    }
    public LocalDate getTakenAt() {
        return takenAt;
    }
    public String getTitle() {
        return title;
    }
}
