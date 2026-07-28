package com.backend.backend_java.model;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

public class Photo {
    @Id
    @GeneratedValue
    private UUID id;

    @Column(nullable = false, name = "project_id")
    private UUID projectId;

    @Column(nullable = true, name = "title")
    private String title;

    @Lob
    @Column(name = "photo", columnDefinition = "bytea")
    private byte[] photo;

    @Column(nullable = true, name = "taken_at")
    private String takenAt;

    @Column(nullable = true, name = "place")
    private String place;

    @Column(nullable = true, name = "order")
    private Integer order;

    @Column(nullable = true, name = "photo_type")
    private String photoType;
}
