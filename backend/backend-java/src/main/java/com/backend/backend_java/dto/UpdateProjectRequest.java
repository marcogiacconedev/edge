package com.backend.backend_java.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class UpdateProjectRequest {
    @NotBlank(message = "Title missing")
    private String title;

    @NotBlank(message = "Description missing")
    private String description;

    @NotNull(message = "Order missing")
    private Integer order;

    public String getDescription() {
        return description;
    }
    public Integer getOrder() {
        return order;
    }
    public String getTitle() {
        return title;
    }
}
