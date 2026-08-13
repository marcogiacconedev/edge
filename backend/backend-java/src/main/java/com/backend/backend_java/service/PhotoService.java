package com.backend.backend_java.service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.backend.backend_java.dto.CreatePhotoRequest;
import com.backend.backend_java.dto.PhotoResponse;
import com.backend.backend_java.dto.UpdatePhotoRequest;
import com.backend.backend_java.model.Photo;
import com.backend.backend_java.model.Project;
import com.backend.backend_java.repository.PhotoRepository;
import com.backend.backend_java.repository.ProjectRepository;

@Service
public class PhotoService {
    private final PhotoRepository photoRepository;
    private final ProjectRepository projectRepository;

    public PhotoService(PhotoRepository photoRepository, ProjectRepository projectRepository) {
        this.photoRepository = photoRepository;
        this.projectRepository = projectRepository;
    }

    public PhotoResponse getPhoto(UUID photoId, UUID userId) {
        Photo photo = photoRepository.findById(photoId).orElseThrow(() -> new RuntimeException("Photo not found"));
        Project project = projectRepository.findById(photo.getProjectId()).orElseThrow(() -> new RuntimeException("Project not found"));

        if (!project.getUserId().equals(userId)) throw new RuntimeException("Not authorized");

        return new PhotoResponse(photo);       
    }

    public Photo getPhotoEntity(UUID photoId) {
        Photo photo = photoRepository.findById(photoId).orElseThrow(() -> new RuntimeException("Photo not found"));
        return photo;
    }

    public List<PhotoResponse> getPhotosByProjectId(UUID projectId) {
        List<Photo> photos = photoRepository.findByProjectId(projectId);
        
        return photos.stream().map(photo -> new PhotoResponse(photo)).collect(Collectors.toList());
    }

    public PhotoResponse createPhoto(UUID projectId, CreatePhotoRequest dto, MultipartFile file, UUID userId) throws IOException {
        Project project = projectRepository.findById(projectId).orElseThrow(() -> new RuntimeException("Project not found"));
        if (!project.getUserId().equals(userId)) throw new RuntimeException("Not Authorized");
        if (file.getContentType() == null || !file.getContentType().startsWith("image/")) throw new RuntimeException("File must be an image");
        Photo photo = new Photo();
        photo.setProjectId(projectId);
        photo.setTitle(dto.getTitle());
        photo.setDescription(dto.getDescription());
        photo.setOrder(dto.getOrder());
        photo.setTakenAt(dto.getTakenAt());
        photo.setUpdatedAt(LocalDate.now());
        photo.setPlace(dto.getPlace());
        photo.setPhoto(file.getBytes());
        photo.setPhotoType(file.getContentType());
        
        photoRepository.save(photo);
        
        return new PhotoResponse(photo);
    }
    
    public PhotoResponse updatePhoto(UUID photoId, UpdatePhotoRequest dto, MultipartFile file, UUID userId) throws IOException {
        Photo photo = photoRepository.findById(photoId).orElseThrow(() -> new RuntimeException("Photo not found"));
        Project project = projectRepository.findById(photo.getProjectId()).orElseThrow(() -> new RuntimeException("Project not found"));
        if (!project.getUserId().equals(userId)) throw new RuntimeException("Not Authorized");
        if (file.getContentType() == null || !file.getContentType().startsWith("image/")) throw new RuntimeException("File must be an image");              
        photo.setTitle(dto.getTitle());
        photo.setDescription(dto.getDescription());
        photo.setOrder(dto.getOrder());
        photo.setTakenAt(dto.getTakenAt());
        photo.setUpdatedAt(LocalDate.now());
        photo.setPlace(dto.getPlace());

        // image data is optional in the put request to not having to send the image too every time
        if (file != null && !file.isEmpty()) {
            if (file.getContentType() == null || !file.getContentType().startsWith("image/")) {
                throw new IllegalArgumentException("File must be an image");
            }
            photo.setPhoto(file.getBytes());
            photo.setPhotoType(file.getContentType());
        }

        photoRepository.save(photo);

        return new PhotoResponse(photo);
    }

    public void deletePhoto(UUID photoId, UUID userId) {
        Photo photo = photoRepository.findById(photoId).orElseThrow(() -> new RuntimeException("Photo not found"));
        Project project = projectRepository.findById(photo.getProjectId()).orElseThrow(() -> new RuntimeException("Project not found"));
        if (!project.getUserId().equals(userId)) throw new RuntimeException("Not Authorized");

        photoRepository.delete(photo);
    }
    
}
