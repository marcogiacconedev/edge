package com.backend.backend_java.dto;

import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CreateProjectRequest {

    @NotBlank(message = "Title missing")
    private String title;

    @NotBlank(message = "Description missing")
    private String description;

    @NotNull(message = "Order missing")
    private Integer order;

    @NotNull(message = "Creation date missing")
    private LocalDate createdAt;

    @NotNull(message = "Update date missing")
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
