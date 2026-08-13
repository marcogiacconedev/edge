package com.backend.backend_java.controller;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.backend_java.dto.CreatePhotoRequest;
import com.backend.backend_java.dto.PhotoResponse;
import com.backend.backend_java.dto.UpdatePhotoRequest;
import com.backend.backend_java.model.Photo;
import com.backend.backend_java.service.PhotoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api")
public class PhotoController {
    private final PhotoService photoService;

    public PhotoController(PhotoService photoService) {
        this.photoService = photoService;
    }
    
    @GetMapping("/photos/{photoId}")
    public ResponseEntity<PhotoResponse> getPhoto(
        @PathVariable UUID photoId,
        @AuthenticationPrincipal String userId
    ) {
        PhotoResponse photoResponse = photoService.getPhoto(photoId, UUID.fromString(userId));

        return ResponseEntity.ok(photoResponse);
    }

    // endpoint to get the file. Use it like <img src="/api/photos/123e4567-e89b-12d3-a456-426614174000/file" />
    @GetMapping("/photos/{photoId}/file")    
    public ResponseEntity<byte[]> getPhotoFile(@PathVariable UUID photoId) {
        Photo photo = photoService.getPhotoEntity(photoId);
        return ResponseEntity.ok()
            .contentType(MediaType.parseMediaType(photo.getPhotoType()))
            .body(photo.getPhoto());
    }

    @GetMapping("/projects/{projectId}/photos")
    public ResponseEntity<List<PhotoResponse>> getPhotosByProjectId(
        @PathVariable UUID projectId
    ) {
        List<PhotoResponse> photos = photoService.getPhotosByProjectId(projectId);
        return ResponseEntity.ok(photos);
    }

    @PostMapping(value = "/projects/{projectId}/photos", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PhotoResponse> createPhoto(
        @PathVariable UUID projectId,
        @RequestPart("data") @Valid CreatePhotoRequest dto,
        @RequestPart("file") MultipartFile file,
        @AuthenticationPrincipal String userId
    ) throws IOException {
        PhotoResponse photoResponse = photoService.createPhoto(projectId, dto, file, UUID.fromString(userId));
        return ResponseEntity.ok(photoResponse);
    }

    @PutMapping(value = "/photos/{photoId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PhotoResponse> updatePhoto(
        @PathVariable UUID photoId,
        @RequestPart("data") @Valid UpdatePhotoRequest dto,
        @RequestPart(value = "file", required = true) MultipartFile file,
        @AuthenticationPrincipal String userId
    ) throws IOException {
        PhotoResponse photoResponse = photoService.updatePhoto(photoId, dto, file, UUID.fromString(userId));
        return ResponseEntity.ok(photoResponse);
    }

    @DeleteMapping("photos/{photoId}")
    public ResponseEntity<Void> deletePhoto(
        @PathVariable UUID photoId,
        @AuthenticationPrincipal String userId
    ) {
        photoService.deletePhoto(photoId, UUID.fromString(userId));
        return ResponseEntity.noContent().build();
    }
}
