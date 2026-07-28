package com.backend.backend_java.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;

public class UpdateProjectRequest {
    @NotBlank(message = "Title missing")
    private String title;

    @NotBlank(message = "Description missing")
    private String description;

    @NotBlank(message = "Order missing")
    private Integer order;

    @NotBlank(message = "Update date missing")
    private LocalDate updatedAt;

    public String getDescription() {
        return description;
    }
    public Integer getOrder() {
        return order;
    }
    public String getTitle() {
        return title;
    }
    public LocalDate getUpdatedAt() {
        return updatedAt;
    }
}
