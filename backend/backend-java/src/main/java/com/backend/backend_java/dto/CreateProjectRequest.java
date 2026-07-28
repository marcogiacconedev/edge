package com.backend.backend_java.dto;

import java.time.LocalDate;
import java.util.UUID;

import jakarta.validation.constraints.NotBlank;

public class CreateProjectRequest {

    @NotBlank(message = "Id missing")
    private UUID id;

    @NotBlank(message = "Title missing")
    private String title;

    @NotBlank(message = "Description missing")
    private String description;

    @NotBlank(message = "Order missing")
    private Integer order;

    @NotBlank(message = "Creation date missing")
    private LocalDate createdAt;

    @NotBlank(message = "Update date missing")
    private LocalDate updatedAt;

    public LocalDate getCreatedAt() {
        return createdAt;
    }
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
