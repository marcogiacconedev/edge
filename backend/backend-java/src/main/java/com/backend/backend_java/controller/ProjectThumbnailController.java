package com.backend.backend_java.controller;

import java.io.IOException;
import java.util.UUID;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.backend_java.dto.ProjectThumbnailResponse;
import com.backend.backend_java.model.ProjectThumbnail;
import com.backend.backend_java.service.ProjectThumbnailService;


@RestController
@RequestMapping("/api/projectthumbnails")
public class ProjectThumbnailController {
    private final ProjectThumbnailService projectThumbnailService;

    public ProjectThumbnailController(ProjectThumbnailService projectThumbnailService) {
        this.projectThumbnailService = projectThumbnailService;
    }
    
    @GetMapping("/{projectId}/file")
    public ResponseEntity<byte[]> getProjectThumbnailFile(@PathVariable UUID projectId) {
        ProjectThumbnail photo = projectThumbnailService.getProjectThumbnailEntity(projectId);
        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(photo.getPhotoType()))
            .body(photo.getPhoto());
    }

    @PostMapping(value="/{projectId}",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProjectThumbnailResponse> createThumbnail(
        @AuthenticationPrincipal String userId,
        @RequestPart("file") MultipartFile file,
        @PathVariable UUID projectId
    ) throws IOException {
        ProjectThumbnailResponse projectThumbnailResponse = projectThumbnailService.createThumbnail(projectId, file, UUID.fromString(userId));
        return ResponseEntity.ok(projectThumbnailResponse);
    }

    @PutMapping(value = "/{projectId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ProjectThumbnailResponse> updateThumbnail(
        @PathVariable UUID projectId,
        @RequestPart("file") MultipartFile file,
        @AuthenticationPrincipal String userId
    ) throws IOException {
        ProjectThumbnailResponse thumbnail = projectThumbnailService.updateThumbnail(projectId, file, UUID.fromString(userId));
        return ResponseEntity.ok(thumbnail);
    }
}
